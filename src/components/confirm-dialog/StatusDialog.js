import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

StatusDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onConfirm : PropTypes.func
};

export default function StatusDialog({ onConfirm, onClose, title }) {
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <Stack>
                <DialogContent>{'Are you sure you want to update the status?'}</DialogContent>
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