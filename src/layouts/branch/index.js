import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import DashboardHeader from './header';
import DashboardFooter from './footer';
import NavbarVertical from './navbar/NavbarVertical';
import { HEADER, NAVBAR } from 'src/config';
import useCollapseDrawer from 'src/hooks/useCollapseDrawer';
import useSettings from 'src/hooks/useSettings';
import useResponsive from 'src/hooks/useResponsive';
import NavbarHorizontal from './navbar/NavbarHorizontal';

// ----------------------------------------------------------------------

const MainStyle = styled('main', {
    shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
    flexGrow: 1,
    paddingTop: HEADER.MOBILE_HEIGHT + 24,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
        width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
        transition: theme.transitions.create('margin-left', {
            duration: theme.transitions.duration.shorter,
        }),
        ...(collapseClick && {
            marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
        }),
    },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
    const { collapseClick, isCollapse } = useCollapseDrawer();
    const theme = useTheme();

    const { themeLayout } = useSettings();

    const isDesktop = useResponsive('up', 'lg');

    const [open, setOpen] = useState(false);

    const verticalLayout = themeLayout === 'vertical';

    if (verticalLayout) {
        console.log('verticalLayout', verticalLayout);
        return (
            <>
                <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout} />

                {isDesktop ? (
                    <NavbarHorizontal />
                ) : (
                    <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
                )}

                <Box
                    component="main"
                    sx={{
                        px: { lg: 2 },
                        pt: {
                            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
                            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
                        },
                        pb: {
                            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
                            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
                        },
                    }}
                >
                    <Outlet />
                    <DashboardFooter />
                </Box>

            </>
        );
    }

    return (
        <Box
            sx={{
                display: { lg: 'flex' },
                minHeight: { lg: 1 },
            }}
        >
            <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

            <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

            <MainStyle collapseClick={collapseClick} sx={{
                marginBottom: '112px',
                [theme.breakpoints.down('md')]: {
                    paddingBottom: '120px',
                },
            }}>
                <Outlet />
                <DashboardFooter />
            </MainStyle>

        </Box>
    );
}
