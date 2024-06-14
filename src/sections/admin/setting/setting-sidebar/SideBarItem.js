import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
    Box,
    ListItemText,
    ListItemButton,
} from '@mui/material';
// config
import { ICON } from '../../../../config';

const RootStyle = styled(ListItemButton)(({ theme }) => ({
    padding: theme.spacing(1.5, 3),
    transition: theme.transitions.create('all'),
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
    },
}));

SideBarItem.propTypes = {
    tab: PropTypes.object,
    isOpenSidebar: PropTypes.bool,
    isSelected: PropTypes.bool,
    onSelectTab: PropTypes.func,
};

export default function SideBarItem({ isSelected, tab, isOpenSidebar, onSelectTab }) {
    
    return (
        <RootStyle
            onClick={onSelectTab}
            sx={{
                ...(isSelected && { bgcolor: 'action.selected' }),
            }}
        >
            {tab.icon && (
                <Box
                    component="span"
                    sx={{
                        mr: 1,
                        width: ICON.NAVBAR_ITEM_HORIZONTAL,
                        height: ICON.NAVBAR_ITEM_HORIZONTAL,
                        '& svg': { width: '100%', height: '100%' },
                    }}
                >
                    {tab.icon}
                </Box>
            )}

            {isOpenSidebar && (
                <>
                    <ListItemText
                        primary={tab.label}
                        primaryTypographyProps={{
                            noWrap: true,
                            variant: 'subtitle2',
                        }}
                    />
                </>
            )}
        </RootStyle>
    );
}