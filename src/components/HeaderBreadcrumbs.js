import isString from 'lodash/isString';
import PropTypes from 'prop-types';
// @mui
import { Box, Typography, Link, useTheme } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
    links: PropTypes.array,
    action: PropTypes.node,
    heading: PropTypes.string.isRequired,
    moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    sx: PropTypes.object,
};

export default function HeaderBreadcrumbs({ links, action, heading, moreLink = '' || [], sx, ...other }) {
    const theme = useTheme();
    return (
        <Box sx={{ mb: 2, ...sx }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column'
                    },
                }}
            >
                <Box 
                    sx={{ 
                        flexGrow: 1,
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        }, 
                    }} 
                >
                    <Typography variant="h4" gutterBottom>
                        {heading}
                    </Typography>
                    <Breadcrumbs links={links} {...other} />
                </Box>

                {
                    action &&   <Box 
                                    sx={{ 
                                        flexShrink: 0,
                                        [theme.breakpoints.down('sm')]: {
                                            width: '100%',
                                            mt: '20px'
                                        },  
                                    }}
                                >
                                    {action}
                                </Box>
                }
            </Box>

            <Box sx={{ mt: 2 }}>
                {isString(moreLink) ? (
                    <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
                        {moreLink}
                    </Link>
                ) : (
                    moreLink.map((href) => (
                        <Link
                            noWrap
                            key={href}
                            href={href}
                            variant="body2"
                            target="_blank"
                            rel="noopener"
                            sx={{ display: 'table' }}
                        >
                            {href}
                        </Link>
                    ))
                )}
            </Box>
        </Box>
    );
}
