import { useEffect } from 'react';
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
import { saveSlider } from '../../../redux/slices/slider';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// components
import LoadingScreen from '../../../components/LoadingScreen';
import { FormProvider } from '../../../components/hook-form';
import SliderInfo from './form-sections/SliderInfo';
import Thumbnail from './form-sections/Thumbnail';
import Preferences from './form-sections/Preferences';
import { fileToBaseURL } from 'src/utils/base64';
// ----------------------------------------------------------------------

const getInitialValues = (slider) => {
  return {
    image: slider?.image ? slider?.imageUrl : "",
    title: slider?.title || "",
    shortDesc: slider?.shortDesc || "",
    description: slider?.description || "",
    isNews: slider?.type === "news",
    active: slider?.status === 1,
  }
}

Yup.addMethod(Yup.mixed, 'fileSize', function (maxSize, message) {
  return this.test('fileSize', message, function (value) {
    const { path, createError } = this;
    if (!value) return true; // Skip validation if no file is present
    if (value.size <= maxSize) return true;
    return createError({ path, message });
  });
});

export default function SliderForm({ isEdit, onBack, slider }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state.slider);

  const EventSchema = Yup.object().shape({
    title: Yup.string()
      .required(`Slider Title is required!`),
    image: Yup.mixed().nullable().test('fileSize', 'File size not acceptable more than 1MB', function (value) {
      if (!value || typeof value === 'string') {
        return true;
      }
      return value.size <= 1000000;
    }),
  });

  const methods = useForm({ resolver: yupResolver(EventSchema), defaultValues: getInitialValues(slider), });
  const { reset, control, formState: { errors }, watch, handleSubmit, } = methods;
  const values = watch();

  useEffect(() => {
    if (isEdit && slider) {
      reset(getInitialValues(slider));
    }
  }, [isEdit, slider]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        data.id = slider?._id;
      }
      let baseURL = data.image;
      if (typeof data.image === 'object' && data.image) {
        baseURL = await fileToBaseURL(data.image);
      }
      data.image = baseURL;

      dispatch(saveSlider(data))
        .then((originalPromiseResult) => {
          reset();
          enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
          navigate(PATH_ADMIN.slider.list);
        })
        .catch((rejectedValueOrSerializedError) => {
          enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
        });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ px: 3 }}>
            {/* Slider Thumbnail */}
            <Stack sx={{ my: 3 }}>
              <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
                Slider Thumbnail
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
            {/* Slider Information */}
            <Stack sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
                Slider Information
              </Typography>
              <SliderInfo />
            </Stack >

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
