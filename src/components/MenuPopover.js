import PropTypes from 'prop-types';
// @mui
import { Popover } from '@mui/material';

// ----------------------------------------------------------------------

MenuPopover.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node,
};

export default function MenuPopover({ children, sx, ...other }) {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    p: 1,
                    width: 200,
                    overflow: 'inherit',
                    ...sx,
                },
            }}
            {...other}
        >
            {children}
        </Popover>
    );
}
