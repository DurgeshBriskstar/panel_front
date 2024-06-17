import { useMemo } from 'react';
import * as Yup from 'yup';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Button,
  useTheme,
  Typography,
} from '@mui/material';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { saveCategory } from '../../../redux/slices/category';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fileToBaseURL } from '../../../utils/base64';
// components
import LoadingScreen from '../../../components/LoadingScreen';
import { FormProvider } from '../../../components/hook-form';
import SeoInfo from './form-sections/SeoInfo';
import CategoryInfo from './form-sections/CategoryInfo';
import Thumbnail from './form-sections/Thumbnail';
import Preferences from './form-sections/Preferences';
// ----------------------------------------------------------------------

export default function CategoryForm({ isEdit, onBack, category }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state.category);

  const EventSchema = Yup.object().shape({
    name: Yup.string()
      .required(`Category Title is required!`)
  });

  const defaultValues = useMemo(() => {
    return {
      image: category?.image || "",
      title: category?.title || "",
      shortDesc: category?.shortDesc || "",
      description: category?.description || "",
      metaKeywords: [],
      metaTitle: category?.metaTitle || "",
      metaDesc: category?.metaDesc || "",
      isCity: category?.isCity || false,
      active: category?.active || true,
      showInNav: category?.showInNav || false,

    }
  }, [category]);


  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    watch,
    handleSubmit,
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    console.log("data", data);
    // try {
    //   let baseURL = category?.image;
    //   if (typeof data.image === 'object' && data.image) {
    //     baseURL = await fileToBaseURL(data.image);
    //   }
    //   data.image = baseURL;

    //   if (!isEdit) {
    //     dispatch(saveCategory(data))
    //       .then((originalPromiseResult) => {
    //         reset();
    //         enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
    //         navigate(PATH_ADMIN.category.list);
    //       })
    //       .catch((rejectedValueOrSerializedError) => {
    //         enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
    //       });
    //   } else {
    //     data.id = category?._id;
    //     dispatch(saveCategory(data, { autoHideDuration: 5000 }))
    //       .then((originalPromiseResult) => {
    //         reset();
    //         enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
    //         navigate(PATH_ADMIN.category.list);
    //       })
    //       .catch((rejectedValueOrSerializedError) => {
    //         enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
    //       });
    //   }
    // } catch (error) {
    //   enqueueSnackbar(error.message, { variant: 'error' });
    // }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ px: 3 }}>
            {/* Category Thumbnail */}
            <Stack sx={{ my: 3 }}>
              <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
                Category Thumbnail
              </Typography>
              <Thumbnail />
            </Stack>

            {/* Preferences */}
            <Stack sx={{ my: 3 }}>
              <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
                Preferences
              </Typography>
              <Preferences />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ px: 3 }}>
            {/* Category Information */}
            <Stack sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
                Category Information
              </Typography>
              <CategoryInfo />
            </Stack >

            {/* SEO Information */}
            <Stack sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
                SEO Information
              </Typography>
              <SeoInfo />
            </Stack>


            <Stack
              direction="row"
              sx={{
                my: 3,
                justifyContent: 'flex-end',
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                },
              }}
            >
              <Button variant="outlined" color="inherit" onClick={onBack} sx={{ mr: 1 }}> Back </Button>
              <LoadingButton type="submit" variant="contained" loading={isLoading}>Submit</LoadingButton>
            </Stack>
          </Card >
        </Grid >
      </Grid >
    </FormProvider >
  );
}
