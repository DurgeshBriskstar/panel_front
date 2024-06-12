import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Button,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

CancelDialog.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    onConfirm : PropTypes.func
};

export default function CancelDialog({ onConfirm, onClose, title }) {
    const [reason, setReason] = useState('');
    
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <Stack>
                <DialogContent>
                    <TextField 
                        name="description" 
                        label="Description" 
                        onChange={(event) => setReason(event.target.value)}
                        fullWidth 
                        multiline 
                        rows={3} 
                    />
                </DialogContent>
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
                    onClick={() => onConfirm(reason)}
                >
                    Confirm
                </Button>
            </DialogActions>
        </>
    )
}