import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// utils
import { myBrowser } from '../../../utils/mySystem';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import LoadingScreen from '../../../components/LoadingScreen';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [browserDetail, setBrowserDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: false,
    mixPanel: browserDetail
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = methods;

  useEffect(() => {
    myBrowser().then(originalPromiseResult => {
      setBrowserDetail(originalPromiseResult);
    });
  }, [])

  useEffect(() => {
    const errLength = Object.keys(errors).length;
    setLoading(errLength > 0 ? false : isSubmitted);
  }, [errors, isSubmitted]);

  const onSubmit = async (data) => {
    setLoading(true);
    data.mixPanel = browserDetail;
    try {
      await login(data.email, data.password, data.mixPanel).then(originalPromiseResult => {
        setLoading(false);
        enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
      }).catch(rejectedValueOrSerializedError => {
        setLoading(false);
        if (isMountedRef.current) {
          setError('afterSubmit', { ...rejectedValueOrSerializedError, message: rejectedValueOrSerializedError.message });
        }
      });
    } catch (error) {
      reset();
      setLoading(false);
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="email"
          label="Email Address"
          inputProps={{ maxLength: 50 }}
          autoFocus
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" >
        Sign in
      </LoadingButton>
    </FormProvider>
  );
}
