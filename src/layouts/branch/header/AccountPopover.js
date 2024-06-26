import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Divider, Typography, Stack, MenuItem, Button, IconButton, alpha } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import LoadingScreen from '../../../components/LoadingScreen';
import { MyAvatar } from 'src/components/images';
import useAuth from 'src/hooks/useAuth';
import { PATH_BRANCH } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const [open, setOpen] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { user } = useAuth();

    // handle open onClick event
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    // handle close onClick event
    const handleClose = () => {
        setOpen(null);
    };

    // handle logout onClick event
    const handleLogout = async () => {
        setLoading(true);
        // try {
        //     await logout().then(originalPromiseResult => {
        //         setLoading(false);
        //         navigate(PATH_AUTH.root, { replace: true });
        //         if (isMountedRef.current) {
        //             handleClose();
        //         }
        //         enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
        //     }).catch(rejectedValueOrSerializedError => {
        //         setLoading(false);
        //         enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
        //     });
        // } catch (error) {
        //     setLoading(false);
        //     enqueueSnackbar('Unable to logout!', { variant: 'error' });
        // }
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
                    <MenuItem key={'Account'} to={PATH_BRANCH.setting.account} component={RouterLink} onClick={handleClose}>
                        {'Account'}
                    </MenuItem>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
                    {isLoading ? <LoadingScreen /> : 'Sign Out'}
                </MenuItem>
            </MenuPopover>
        </>
    );
}
