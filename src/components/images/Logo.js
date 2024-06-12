import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
// hooks
import Image from './Image';

// ----------------------------------------------------------------------

Logo.propTypes = {
    disabledLink: PropTypes.bool,
    isCollapse: PropTypes.bool,
    sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, isCollapse = false, sx }) {
    const logoHalf = '/logo/LogoHalf.png';
    const logoFull = '/logo/LogoFull.png';
    const logo = (
        <Box sx={{ 
            width: 120, 
            height: 40,
            ...(isCollapse && {
                width: 70, 
                height: 40, 
            }),
            ...sx 
        }}>
            <Image src={window.location.origin + logoFull}/>
        </Box>
    );

    if (disabledLink) {
        return <>
            <Box sx={{ 
                width: 120, 
                height: 40, 
                ...sx 
            }}>
                <Image src={window.location.origin + logoHalf}/>
            </Box>
        </>;
    }

    return <RouterLink to="/">{logo}</RouterLink>;
}
