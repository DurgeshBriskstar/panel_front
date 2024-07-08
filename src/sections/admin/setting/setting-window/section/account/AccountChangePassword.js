import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider } from 'src/components/hook-form';
import SecurityInfo from './form-sections/SecurityInfo';
import useAuth from 'src/hooks/useAuth';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function AccountChangePassword({ userInfo }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useAuth();

  const [isLoading, setLoading] = useState(false);

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.userId = userInfo?._id;

      await account(data, "password").then(originalPromiseResult => {
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
        {/* Update Password */}
        <Stack sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ my: 1, color: `${theme.palette.primary.main}`, textAlign: 'left' }}>
            Update password
          </Typography>
          <SecurityInfo />
        </Stack>
        <Stack alignItems="flex-end">
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
