import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
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
import { fileToBaseURL } from 'src/utils/base64';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

const getInitialValues = (userInfo) => {
  return {
    image: userInfo?.image ? userInfo?.imageUrl : "",
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    gender: userInfo?.gender || '',
    dateOfBirth: userInfo?.dateOfBirth || '',
    about: userInfo?.about || '',
    email: userInfo?.email || '',
    secondaryEmail: userInfo?.secondaryEmail || '',
    primaryPhone: userInfo?.primaryPhone || '',
    secondaryPhone: userInfo?.secondaryPhone || '',
    address: {
      streetAddress: userInfo?.address?.streetAddress || '',
      address: userInfo?.address?.address || '',
      city: userInfo?.address?.city || '',
      state: userInfo?.address?.state || '',
      pinCode: userInfo?.address?.pinCode || '',
      country: userInfo?.address?.country || '',
    },
    active: userInfo?.status === 1,
  }
}

export default function AccountGeneral({ userInfo }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useAuth();
  const { user } = useAuth();

  const [isLoading, setLoading] = useState(false);

  const UpdateWebSchema = Yup.object().shape({
    firstName: Yup.string().required('firstName is required'),
    email: Yup.string().required('Email is required'),
    gender: Yup.string().required('Gender is required'),
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
      let baseURL = data.image;
      if (typeof data.image === 'object' && data.image) {
        baseURL = await fileToBaseURL(data.image);
      }
      data.image = baseURL;
      data.userId = userInfo?._id || null;

      if (user?._id === userInfo?._id) {
        await account(data, "general").then(originalPromiseResult => {
          setLoading(false);
          enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
        }).catch(rejectedValueOrSerializedError => {
          setLoading(false);
          enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
        });
      } else {
        console.log("data", data);
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      enqueueSnackbar(error.message, { variant: 'error' });
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
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
