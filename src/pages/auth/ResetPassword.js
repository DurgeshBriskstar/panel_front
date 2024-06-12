import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Stack, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
// import { ResetPasswordForm } from '../../sections/auth/reset-password';

// ----------------------------------------------------------------------

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    // const handleEmailSent = (value) => {
    //     setEmail(value);
    //     setIsEmailSent(true);
    // }

    return (
        <Page
            title="Reset Password"
            sx={{
                height: 1,
                bgcolor: '#F4FCFF',
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '16px',
                }}
            >
                <Box sx={{ maxWidth: 480, mx: 'auto' }} >
                    <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                        Logo
                    </Stack>

                    {(isEmailSent === false) ? (
                        <>
                            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h4" gutterBottom>
                                        Forgot your password?
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        Please enter the email address associated with your account and We will email you a password to login with app.
                                    </Typography>
                                </Box>
                            </Stack>

                            {/* <ResetPasswordForm onGetEmail={handleEmailSent} /> */}

                            <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                                Back
                            </Button>
                        </>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h3" gutterBottom>
                                Request sent successfully
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                We have sent a confirmation email to &nbsp;
                                <strong>{email}</strong>
                                <br />
                                Please check your email.
                            </Typography>

                            <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                                Back
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Page>
    );
}
