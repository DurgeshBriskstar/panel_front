import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef, useEffect } from 'react';
// @mui
import { Box } from '@mui/material';
// GTM 
import TagManager from 'react-gtm-module';
// hook
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => {
    const { isAuthenticated } = useAuth();
    const tagManagerArgs = {
        gtmId: 'GTM-TVFH9CN',
        dataLayer: {
            userProject: 'Onestop Booking',
            page: {title}
        },
        dataLayerName: 'PageDataLayer'
    }

    useEffect(() => {
        if(!isAuthenticated) {
            TagManager.initialize(tagManagerArgs)
        }
    },[title, isAuthenticated]);

    return (
        <>
            <Helmet>
                <title>{`${title} | Onestop Booking`}</title>
                {meta}
            </Helmet>

            <Box ref={ref} {...other}>
                {children}
            </Box>
        </>
    )
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    meta: PropTypes.node,
};

export default Page;
