// ----------------------------------------------------------------------

export default function Menu(theme) {
    return {
        MuiMenu: {
            styleOverrides: {
                root: {
                    '& .MuiMenu-list': {
                        maxHeight: 200,
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: theme.palette.action.selected,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                    },
                },
            },
        },
    };
}
