import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

UnsubscribeDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func
};

export default function UnsubscribeDialog({ onConfirm, onClose, title }) {
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <Stack>
                <DialogContent>{'Are you sure you want to unsubscribe customer to send emails?'}</DialogContent>
            </Stack>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </>
    )
}