// @mui
import { Box, Stack, Container } from '@mui/material';

// components
import Page from '../../components/Page';
// sections
// import { SignUpForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

export default function SignUp() {
    return (
        <Page
            title={'SignUp'}
        >
            <Container
                sx={{
                    bgcolor: '#FFFFFF',
                    margin: '24px auto',
                    borderRadius: '16px',
                }}
            >
                <Box
                    sx={{
                        mx: 'auto'
                    }}
                >
                    <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                        Logo
                    </Stack>

                    {/* <SignUpForm /> */}
                </Box>
            </Container>
        </Page>
    );
}
