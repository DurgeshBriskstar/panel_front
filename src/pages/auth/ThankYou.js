// @mui
import {
    Box,
    Stack,
    Button,
    Container,
    Typography
} from '@mui/material';
// hooks
// components
import Page from '../../components/Page';
// routes
import { PATH_BRANCH, PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function ThankYou() {
    // clickHome on click event
    const clickHome = async () => {
        window.location.replace(PATH_BRANCH.dashboard);
        // try {
        //     await generateToken(agencyToken).then(originalPromiseResult => {
        //         enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
        //     }).catch(rejectedValueOrSerializedError => {
        //         enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
        //     });
        // } catch (error) {
        //     enqueueSnackbar(error.message, { variant: 'error' });
        // }
    };

    return (
        <Page
            title="Thank You"
        >
            <Container
                maxWidth='sm'
                sx={{
                    bgcolor: '#FFFFFF',
                    margin: '24px auto',
                    borderRadius: '16px',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 480,
                        mx: 'auto'
                    }}
                >
                    <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                        Logo
                    </Stack>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" gutterBottom>
                            Thank You For Sign Up
                        </Typography>

                        <Button size="large" variant="contained" onClick={clickHome} sx={{ mt: 5 }}>
                            Go To Home
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Page>
    );
}
