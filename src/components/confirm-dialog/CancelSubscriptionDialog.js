import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

// ----------------------------------------------------------------------


CancelSubscriptionDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
};

export default function CancelSubscriptionDialog({ onClose, title }) {
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <Stack>
                <DialogContent>
                    {'The feature is currently not permitted. Kindly select the plan through the settings to enable the feature.'}
                </DialogContent>
            </Stack>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                >
                    Okay
                </Button>
            </DialogActions>
        </>
    )
};