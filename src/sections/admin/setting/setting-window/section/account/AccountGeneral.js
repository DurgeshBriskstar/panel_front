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
import PersonalInfo from './form-sections/PersonalInfo';
import ProfileImageSection from './form-sections/ProfileImageSection';
import ContactInfo from './form-sections/ContactInfo';
import AddressInfo from './form-sections/AddressInfo';

// ----------------------------------------------------------------------

const getInitialValues = (userInfo) => {
  return {
    image: userInfo?.image || '',
    imageUrl: userInfo?.imageUrl || '',
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    gender: userInfo?.gender || '',
    dateOfBirth: userInfo?.dateOfBirth || '',
    about: userInfo?.about || '',
    email: userInfo?.email || '',
    secondaryEmail: userInfo?.secondaryEmail || '',
    primaryPhone: userInfo?.primaryPhone || '',
    secondaryPhone: userInfo?.secondaryPhone || '',
    street: userInfo?.street || '',
    address: userInfo?.address || '',
    city: userInfo?.city || '',
    state: userInfo?.state || '',
    pinCode: userInfo?.pinCode || '',
    country: userInfo?.country || '',
    active: userInfo?.status === 1,
  }
}

export default function AccountGeneral({ userInfo }) {
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleRemove = useCallback(
    () => {
      setValue('photoURL', null);
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        {/* Profile Image Section */}
        <Stack>
          <ProfileImageSection />
        </Stack>

        {/* Personal Info */}
        <Stack sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
            Personal info
          </Typography>
          <PersonalInfo />
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
          <LoadingButton type="submit" variant="contained" loading>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
