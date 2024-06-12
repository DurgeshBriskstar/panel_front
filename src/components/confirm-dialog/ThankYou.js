import PropTypes from 'prop-types';
// @mui
import {
    Box,
    Stack,
    Button,
    useTheme,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

ThankYou.propTypes = {
    onClose: PropTypes.func,
};

export default function ThankYou({ onClose }) {
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Stack>
                <DialogTitle>
                    <Typography variant="h3" gutterBottom>
                        Thank You
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant='body1' sx={{ color: theme.palette.grey[600] }}>
                        <strong style={{marginTop: 6, display: 'block'}}>
                            Your plan has been upgraded successfully.
                        </strong>
                    </Typography>
                </DialogContent>
            </Stack>
            <DialogActions sx={{ justifyContent: 'center'}}>
                <Button
                    variant="contained"
                    onClick={() => onClose()}
                >
                    Ok
                </Button>
            </DialogActions>
        </Box>
    )
}