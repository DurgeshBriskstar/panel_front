// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, useTheme } from '@mui/material';
// config
import { NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

const FooterStyle = styled('footer', {
    shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
        transition: theme.transitions.create(['width', 'height'], {
            duration: theme.transitions.duration.shorter,
        }),
        ...(collapseClick && {
            width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
        }),
    },
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
    const theme = useTheme();
    return (
        <FooterStyle sx={{
            position: 'fixed',
            left: '0',
            right: '0',
            bottom: '0',
            marginLeft: '280px',
            backgroundColor: '#fff',
            [theme.breakpoints.down('lg')]: {
                position: 'fixed',
                marginLeft: '0',
            },
        }}
        >
            <Box
                sx={{
                    py: 2.5,
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: theme.palette.grey[600]
                    }}
                >
                    © Copyright {new Date().getFullYear()} All Right Reserved
                </Typography>
            </Box>
        </FooterStyle>
    );
}
