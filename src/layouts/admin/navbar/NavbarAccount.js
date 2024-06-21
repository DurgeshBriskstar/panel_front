import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_ADMIN, PATH_FLYWHEEL } from '../../../routes/paths';
// components
import { MyAvatar } from '../../../components/images';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[500_12],
    transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
    }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
    isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
    const { user } = useAuth();

    return (
        <Link underline="none" color="inherit" component={RouterLink} to={PATH_ADMIN.setting.account}>
            <RootStyle
                sx={{
                    ...(isCollapse && {
                        bgcolor: 'transparent',
                    }),
                }}
            >
                <MyAvatar />

                <Box
                    sx={{
                        ml: 2,
                        transition: (theme) =>
                            theme.transitions.create('width', {
                                duration: theme.transitions.duration.shorter,
                            }),
                        ...(isCollapse && {
                            ml: 0,
                            width: 0,
                        }),
                    }}
                >
                    <Typography variant="subtitle2" noWrap sx={{ whiteSpace: 'pre-wrap' }}>
                        {`${user?.firstName || ""} ${user?.lastName || ""}`}
                    </Typography>
                    <Typography variant="body2" noWrap sx={{ color: 'text.secondary', fontSize: '13px', whiteSpace: 'pre-wrap' }}>
                        {capitalCase(user?.role)}
                    </Typography>
                </Box>

            </RootStyle>
        </Link>
    );
}
