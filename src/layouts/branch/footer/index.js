// @mui
import { Box, Typography } from '@mui/material';
// ----------------------------------------------------------------------

export default function MainFooter() {
    return (
        <Box
            sx={{
                py: 2.5,
                textAlign: 'center',
                position: 'relative',
            }}
        >
            <Typography variant="subtitle2" sx={{ color: 'gray' }} >
                © Copyright {new Date().getFullYear()} All Right Reserved
            </Typography>
        </Box>
    );
}
