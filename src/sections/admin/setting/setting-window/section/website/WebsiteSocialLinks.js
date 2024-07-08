import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Card, Stack, Typography, useTheme } from '@mui/material';
// components
import { FormProvider } from 'src/components/hook-form';
import SocialInfo from './form-sections/SocialInfo';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const getInitialValues = (webInfo) => {
  return {
    facebookLink: webInfo?.facebookLink || '',
    instagramLink: webInfo?.instagramLink || '',
    linkedinLink: webInfo?.linkedinLink || '',
    twitterLink: webInfo?.twitterLink || '',
    pinterestLink: webInfo?.twitterLink || '',
    youtubeLink: webInfo?.twitterLink || '',
  }
}

export default function WebsiteSocialLinks({ isLoading, webInfo }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const UpdateWebSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const methods = useForm({ resolver: yupResolver(UpdateWebSchema), defaultValues: getInitialValues(webInfo), });
  const { reset, handleSubmit, } = methods;

  useEffect(() => {
    if (webInfo) {
      reset(getInitialValues(webInfo));
    }
  }, [webInfo]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* Social Info */}
        <Stack sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
            Social info
          </Typography>
          <SocialInfo />
        </Stack>
        <Stack alignItems="flex-end">
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card >
  );
}
