import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Card, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: 'facebookLink',
    icon: <Iconify icon={'logos:facebook'} width={24} height={24} />,
  },
  {
    value: 'instagramLink',
    icon: <Iconify icon={'skill-icons:instagram'} width={24} height={24} />,
  },
  {
    value: 'linkedinLink',
    icon: <Iconify icon={'logos:linkedin-icon'} width={24} height={24} />,
  },
  {
    value: 'twitterLink',
    icon: <Iconify icon={'logos:twitter'} width={24} height={24} />,
  },
  {
    value: 'pinterestLink',
    icon: <Iconify icon={'logos:pinterest'} width={24} height={24} />,
  },
  {
    value: 'youtubeLink',
    icon: <Iconify icon={'logos:youtube-icon'} width={24} height={24} />,
  },
];

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
  const { enqueueSnackbar } = useSnackbar();

  const UpdateWebSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const methods = useForm({ resolver: yupResolver(UpdateWebSchema), defaultValues: getInitialValues(webInfo), });
  const { setValue, reset, control, formState: { errors }, watch, handleSubmit, } = methods;
  const values = watch();

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
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
              }}
            />
          ))}

          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
