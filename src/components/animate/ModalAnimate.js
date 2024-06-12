import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
// @mui
import { Box, Paper, Modal } from '@mui/material';



// ----------------------------------------------------------------------

ModalAnimate.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    open: PropTypes.bool,
};


export default function ModalAnimate({ open = false, onClose, children }) {
    return (
        <AnimatePresence>
            {open && (
                <Modal
                    open={open}
                    onClose={onClose}
                >
                    <Box component={m.div} sx={{ width: '100%', height: '100%', display : 'flex', justifyContent: 'center' , position : 'fixed' }}>
                        <Paper variant="outlined" sx= {{ overflowY : 'auto' , alignItems: 'center' , margin:'32px' , borderRadius : '16px', width : '900px', position :'relative'}}>
                            {children}
                        </Paper>
                    </Box>
                </Modal>
            )
            }
        </AnimatePresence>
    );
}


