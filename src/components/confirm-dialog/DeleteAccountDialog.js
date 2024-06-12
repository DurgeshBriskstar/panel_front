import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// utils
import FDateValue from '../../utils/formatTime';

// ----------------------------------------------------------------------


DeleteAccountDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default function DeleteAccountDialog({ onConfirm, onClose, title }) {
    const { user } = useAuth();

    return (
        <>
            <DialogTitle sx={{
                backgroundColor: "primary.main",
                color: "white",
                textAlign: "center",
                paddingBottom: "15px",
            }}>{title}</DialogTitle>
            <Stack sx={{ textAlign: 'center' }}>
                <DialogContent>
                    {'Are you sure want to cancel your Subscription?'}
                </DialogContent>
                {user.planEndDate &&
                    <DialogContent sx={{ display: 'flex', justifyContent: 'center', padding: '0' }}>
                        <Typography sx={{ fontWeight: '700', padding: '0' }}>
                            {`Note -`}
                        </Typography>

                        <Typography>
                            {`Your subscription will be cancelled from ${FDateValue(user.planEndDate)}.`}
                        </Typography>
                    </DialogContent>
                }
            </Stack>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
                    color="inherit"
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={onConfirm}
                    loading="false"
                >
                    Yes
                </Button>
            </DialogActions>
        </>
    )
};