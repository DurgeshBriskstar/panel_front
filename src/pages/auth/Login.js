import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Stack, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
// import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

export default function Login() {

    return (
        <Page
            title="Login"
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

                    <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" gutterBottom>
                                Sign in
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                        </Box>
                    </Stack>

                    {/* <LoginForm /> */}

                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Box>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Don’t have an account? {''}
                                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </Page>
    );
}
