import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Stack, Container, Typography, styled, useTheme } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
    [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 2),
        padding: theme.spacing(0, 2),
    }
}));
// ----------------------------------------------------------------------

export default function Login() {
    const theme = useTheme();

    return (
        <Page
            title="Login"
        >
            <RootStyle>
                <Container
                    maxWidth="sm"
                    sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '16px',
                        padding: (theme) => theme.spacing(5, 0),
                        boxShadow: (theme) => theme.customShadows.z8,
                        [theme.breakpoints.down('sm')]: {
                            padding: theme.spacing(2, 2),
                        }
                    }}
                >
                    <Box sx={{ maxWidth: 480, mx: 'auto' }} >
                        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                            Logo
                        </Stack>

                        <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4" gutterBottom>
                                    Sign in
                                </Typography>
                            </Box>
                        </Stack>

                        <LoginForm />

                        {/* <Stack
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
                        </Stack> */}
                    </Box>
                </Container>
            </RootStyle>
        </Page>
    );
}
