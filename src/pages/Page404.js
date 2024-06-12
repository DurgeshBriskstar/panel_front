import { Link as RouterLink } from 'react-router-dom';
import { m } from 'framer-motion';
// @mui
import { Box, Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function Page404() {
    return (
        <Page title="404 Page Not Found" sx={{ height: 1 }}>
            <Container>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                    <m.div>
                        <Typography variant="h3" paragraph>
                            Sorry, page not found!
                        </Typography>
                    </m.div>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
                        your spelling.
                    </Typography>
                    <Button to="/" size="large" variant="contained" component={RouterLink}>
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </Page>
    );
}
