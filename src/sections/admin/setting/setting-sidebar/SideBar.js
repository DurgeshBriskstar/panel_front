import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Drawer, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// routes
import { PATH_ADMIN } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { SvgIconStyle } from '../../../../components/images';
// section
import SideBarItem from './SideBarItem';

// ----------------------------------------------------------------------

const ToggleButtonStyle = styled((props) => <IconButton disableRipple {...props} />)(({ theme }) => ({
    left: 0,
    zIndex: 9,
    width: 32,
    height: 32,
    position: 'absolute',
    top: theme.spacing(13),
    borderRadius: `0 12px 12px 0`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.primary,
    '&:hover': {
        backgroundColor: theme.palette.primary.darker,
    },
}));

const getIcon = (name) => <Iconify width={16} height={16} icon={name} />;

const SETTING_TABS = [
    { id: '1', label: 'Account', value: 'account-setting', icon: getIcon('eva:people-fill') },
    { id: '2', label: 'Website Setting', value: 'website-setting', icon: getIcon('eva:globe-outline') },
];

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { tabKey } = useParams();
    const { pathname } = useLocation();
    const [openSidebar, setOpenSidebar] = useState(true);

    const isDesktop = useResponsive('up', 'md');
    const isCollapse = isDesktop && !openSidebar;

    useEffect(() => {
        if (!isDesktop) {
            return handleCloseSidebar();
        }
        return handleOpenSidebar();
    }, [isDesktop, pathname]);

    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };

    const handleCloseSidebar = () => {
        setOpenSidebar(false);
    };

    const handleToggleSidebar = () => {
        setOpenSidebar((prev) => !prev);
    };

    const handleSelectTab = (tabId) => {
        let tabKey = 'account-setting';

        const otherTab = SETTING_TABS.find(
            (tab) => tab.id === tabId
        );
        if (otherTab?.value) {
            tabKey = otherTab?.value;
        }
        navigate(PATH_ADMIN.setting.settingView(tabKey));
    };

    const renderContent = (
        <>
            <Scrollbar>
                {SETTING_TABS.map((tab) => (
                    <SideBarItem
                        tab={tab}
                        key={tab.id}
                        isOpenSidebar={openSidebar}
                        isSelected={tabKey === tab.value}
                        onSelectTab={() => handleSelectTab(tab.id)}
                    />
                ))}
            </Scrollbar>
        </>
    );

    return (
        <>
            {!isDesktop && (
                <ToggleButtonStyle onClick={handleToggleSidebar}>
                    <Iconify width={16} height={16} icon={'eva:people-fill'} />
                </ToggleButtonStyle>
            )}

            {isDesktop ? (
                <Drawer
                    open={openSidebar}
                    variant="persistent"
                    sx={{
                        width: SIDEBAR_WIDTH,
                        transition: theme.transitions.create('width'),
                        '& .MuiDrawer-paper': {
                            position: 'static',
                            width: SIDEBAR_WIDTH,
                        },
                        ...(isCollapse && {
                            width: SIDEBAR_COLLAPSE_WIDTH,
                            '& .MuiDrawer-paper': {
                                width: SIDEBAR_COLLAPSE_WIDTH,
                                position: 'static',
                                transform: 'none !important',
                                visibility: 'visible !important',
                            },
                        }),
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    ModalProps={{ keepMounted: true }}
                    open={openSidebar}
                    onClose={handleCloseSidebar}
                    sx={{
                        '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </>
    );
}
