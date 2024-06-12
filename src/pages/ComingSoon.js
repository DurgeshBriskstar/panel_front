// @mui
import { Box, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function ComingSoon() {
    // const countdown = useCountdown(new Date('12/20/2022 10:00'));

    return (
        <Page title="Coming Soon" sx={{ height: 1 }}>
            <Container>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Coming Soon!
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        We are currently working hard on this page!
                    </Typography>
                </Box>
            </Container>
        </Page>
    );
}
