import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Iconify from '../Iconify';

const IconStyle = styled(Iconify)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
}));

GoogleDialog.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm : PropTypes.func
};

export default function GoogleDialog({ onConfirm, onClose, title }) {
    
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Stack direction="row" alignItems="center">
                    <IconStyle icon={'logos:google-calendar'} />
                    {'Do you want to send Google Calendar to your Customer and Nanny?'}
                </Stack>
            </DialogContent>
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