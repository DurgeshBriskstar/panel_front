import PropTypes from 'prop-types';
// @mui
import { Box, Typography, Stack } from '@mui/material';

// ----------------------------------------------------------------------

BlockContent.propTypes = {
    message: PropTypes.string,
    subText: PropTypes.string,
};

export default function BlockContent({ message = '', subText = '' }) {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            direction={{ xs: 'column', md: 'row' }}
            sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
            <Box sx={{ p: 3 }}>
                <Typography gutterBottom variant="h5">
                    {message !== '' && message || `Quick file upload , Click here to begin`}
                </Typography>
                {
                    subText !== '' &&
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {subText}
                    </Typography>
                }
            </Box>
        </Stack>
    );
}
