import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
    onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onGetEmail }) {
    const { forgot } = useAuth();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    
    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
    });

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues: { email: '' },
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        try {
            await forgot(data.email).then((originalPromiseResult)  => {
                if (isMountedRef.current) {
                    onGetEmail(data.email);
                }
                enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            }).catch(rejectedValueOrSerializedError => {
                if (isMountedRef.current) {
                    setError('afterSubmit', { ...rejectedValueOrSerializedError, message: rejectedValueOrSerializedError.message });
                }
            });  
        } catch (error) {
            reset();
            if (isMountedRef.current) {
                setError('afterSubmit', { ...error, message: error.message });
            }
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <RHFTextField 
                    name="email" 
                    label="Email Address" 
                    inputProps={{ maxLength:50 }}
                    autoFocus
                />

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Reset Password
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
