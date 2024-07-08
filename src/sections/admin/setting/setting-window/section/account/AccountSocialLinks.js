import { useEffect, useState } from 'react';
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
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

const getInitialValues = (userInfo) => {
  return {
    socialLinks: {
      facebookLink: userInfo?.facebookLink || '',
      instagramLink: userInfo?.instagramLink || '',
      linkedinLink: userInfo?.linkedinLink || '',
      twitterLink: userInfo?.twitterLink || '',
      pinterestLink: userInfo?.twitterLink || '',
      youtubeLink: userInfo?.twitterLink || '',
    }
  }
}

export default function AccountSocialLinks({ userInfo }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useAuth();

  const [isLoading, setLoading] = useState(false);

  const UpdateWebSchema = Yup.object().shape({
    socialLinks: Yup.object().shape({
      facebookLink: Yup.string().required('Facebook link is required'),
    }),
  });

  const methods = useForm({ resolver: yupResolver(UpdateWebSchema), defaultValues: getInitialValues(userInfo), });
  const { reset, handleSubmit, } = methods;

  useEffect(() => {
    if (userInfo) {
      reset(getInitialValues(userInfo));
    }
  }, [userInfo]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.userId = userInfo?._id;

      await account(data, "social").then(originalPromiseResult => {
        setLoading(false);
        enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
      }).catch(rejectedValueOrSerializedError => {
        setLoading(false);
        enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
      });
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
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
