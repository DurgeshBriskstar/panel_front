import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Stack, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider } from 'src/components/hook-form';
import GeneralInfo from './form-sections/GeneralInfo';
import LogoSection from './form-sections/LogoSection';
import ContactInfo from './form-sections/ContactInfo';
import AddressInfo from './form-sections/AddressInfo';
import { useDispatch } from 'src/redux/store';
import { saveWebInfo } from 'src/redux/slices/webInfo';
import { fileToBaseURL } from 'src/utils/base64';

// ----------------------------------------------------------------------

const getInitialValues = (webInfo) => {
  return {
    image: webInfo?.logo ? webInfo?.logoUrl : "",
    title: webInfo?.title || '',
    subTitle: webInfo?.subTitle || '',
    category: webInfo?.category || '',
    aboutUs: webInfo?.aboutUs || '',
    primaryEmail: webInfo?.primaryEmail || '',
    secondaryEmail: webInfo?.secondaryEmail || '',
    primaryPhone: webInfo?.primaryPhone || '',
    secondaryPhone: webInfo?.secondaryPhone || '',
    whatsAppPhone: webInfo?.whatsAppPhone || '',

    facebookLink: webInfo?.facebookLink || '',
    linkedinLink: webInfo?.linkedinLink || '',
    instagramLink: webInfo?.instagramLink || '',
    twitterLink: webInfo?.twitterLink || '',
    pinterestLink: webInfo?.pinterestLink || '',
    youtubeLink: webInfo?.youtubeLink || '',

    streetAddress: webInfo?.streetAddress || '',
    address: webInfo?.address || '',
    city: webInfo?.city || '',
    state: webInfo?.state || '',
    pincode: webInfo?.pincode || '',
    country: webInfo?.country || '',
  }
}

export default function WebsiteGeneral({ isLoading, webInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const UpdateWebSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const methods = useForm({ resolver: yupResolver(UpdateWebSchema), defaultValues: getInitialValues(webInfo), });
  const { setValue, reset, handleSubmit, } = methods;

  useEffect(() => {
    if (webInfo) {
      reset(getInitialValues(webInfo));
    }
  }, [webInfo]);

  const onSubmit = async (data) => {
    try {
      if (webInfo?._id) {
        data.id = webInfo?._id;
      }
      let baseURL = data.image;
      if (typeof data.image === 'object' && data.image) {
        baseURL = await fileToBaseURL(data.image);
      }
      data.image = baseURL;

      dispatch(saveWebInfo('general', data))
        .then((originalPromiseResult) => {
          reset();
          enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
        })
        .catch((rejectedValueOrSerializedError) => {
          enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        {/* Logo Section */}
        <Stack>
          <LogoSection />
        </Stack>

        {/* General Info */}
        <Stack sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
            General info
          </Typography>
          <GeneralInfo />
        </Stack>

        {/* General Info */}
        <Stack sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
            Contact info
          </Typography>
          <ContactInfo />
        </Stack>

        {/* General Info */}
        <Stack sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
            Address info
          </Typography>
          <AddressInfo />
        </Stack>

        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
