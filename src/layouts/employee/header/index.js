import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountPopover from './AccountPopover';
import { HEADER, NAVBAR } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';
import useOffSetTop from 'src/hooks/useOffSetTop';
// utils
import cssStyles from 'src/utils/cssStyles';
import { customShadows } from 'src/theme/shadows';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
    ...cssStyles(theme).bgBlur(),
    boxShadow: theme.shadows.z8,
    height: HEADER.MOBILE_HEIGHT,
    zIndex: theme.zIndex.appBar + 1,
    transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up('lg')]: {
        height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
        width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
        ...(isCollapse && {
            width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
        }),
        ...(isOffset && {
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
        }),
        ...(verticalLayout && {
            width: '100%',
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
            backgroundColor: theme.palette.background.default,
        }),
    },
}));

// ----------------------------------------------------------------------

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
    const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
    const isDesktop = useResponsive('up', 'lg');
    return (
        <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
            <Toolbar
                sx={{
                    minHeight: '100% !important',
                    px: { lg: 5 },
                }}
            >
                {isDesktop && verticalLayout && <IconButton>LOGO</IconButton>}

                {!isDesktop && (
                    <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                        <Iconify icon="eva:menu-2-fill" />
                    </IconButton>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <AccountPopover />
                </Stack>
            </Toolbar>
        </RootStyle>
    );
}
