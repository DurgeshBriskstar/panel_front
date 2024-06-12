import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { Dialog, Box, Paper } from '@mui/material';

// ----------------------------------------------------------------------

DialogAnimate.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    sx: PropTypes.object,
    width: PropTypes.string,
};

export default function DialogAnimate({ open = false, width, onClose, children, sx, ...other }) {
    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    fullWidth
                    maxWidth={width}
                    open={open}
                    onClose={onClose}
                    PaperComponent={(props) => (
                        <Box
                            component={m.div}
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                        <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
                            <Paper sx={sx} {...props}>
                                {props.children}
                            </Paper>
                        </Box>
                    )}
                    {...other}
                >
                    {children}
                </Dialog>
            )}
        </AnimatePresence>
    );
}
