// @mui
import {
    Stack,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

export default function SessionDialog() {
    const onLoad = () => {
        window.location.reload();
    }

    return (
        <>
            <DialogTitle>{'Session Expired'}</DialogTitle>
            <Stack>
                <DialogContent>
                    {'You have been signed out. Please Sign in again.'}
                </DialogContent>
            </Stack>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onLoad}
                >
                    Sign In
                </Button>
            </DialogActions>
        </>
    )
}