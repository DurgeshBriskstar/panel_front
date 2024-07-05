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

const getInitialValues = (userInfo) => {
  return {
    facebookLink: userInfo?.facebookLink || '',
    instagramLink: userInfo?.instagramLink || '',
    linkedinLink: userInfo?.linkedinLink || '',
    twitterLink: userInfo?.twitterLink || '',
    pinterestLink: userInfo?.twitterLink || '',
    youtubeLink: userInfo?.twitterLink || '',
  }
}

export default function AccountSocialLinks({ userInfo }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const UpdateWebSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const methods = useForm({ resolver: yupResolver(UpdateWebSchema), defaultValues: getInitialValues(userInfo), });
  const { setValue, reset, control, formState: { errors }, watch, handleSubmit, } = methods;
  const values = watch();

  useEffect(() => {
    if (userInfo) {
      reset(getInitialValues(userInfo));
    }
  }, [userInfo]);

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
          <LoadingButton type="submit" variant="contained" loading>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card >
  );
}
