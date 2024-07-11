import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Divider, Typography, Stack, MenuItem, Button, IconButton, alpha } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import LoadingScreen from '../../../components/LoadingScreen';
import { MyAvatar } from 'src/components/images';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';
import { PATH_ADMIN, PATH_AUTH } from 'src/routes/paths';
import Iconify from 'src/components/Iconify';
import NavbarAccount from '../navbar/NavbarAccount';

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(null);
    const [isLoading, setLoading] = useState(false);

    // handle open onClick event
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout().then(originalPromiseResult => {
                setLoading(false);
                navigate(PATH_AUTH.root, { replace: true });
                if (isMountedRef.current) {
                    handleClose();
                }
                enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            }).catch(rejectedValueOrSerializedError => {
                setLoading(false);
                enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            });
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Unable to logout!', { variant: 'error' });
        }
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <MyAvatar />
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                }}
            >
                <NavbarAccount />
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {user?.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack sx={{ p: 1 }}>
                    <MenuItem key={'Setting'} to={PATH_ADMIN.setting.account} component={RouterLink} onClick={handleClose}>
                        <Iconify width={24} height={24} sx={{ mr: 1 }} icon='eos-icons:rotating-gear' />
                        {'Setting'}
                    </MenuItem>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    <Iconify width={24} height={24} sx={{ mr: 1 }} icon='line-md:logout' />
                    {isLoading ? <LoadingScreen /> : 'Sign Out'}
                </MenuItem>
            </MenuPopover>
        </>
    );
}
