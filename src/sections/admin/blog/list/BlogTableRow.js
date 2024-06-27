import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, MenuItem, Tooltip } from '@mui/material';
// config
import { fTime } from "../../../../utils/formatTime";
// utils
import createAvatar from '../../../../utils/createAvatar';
// components
import Label from '../../../../components/Label';
import { Avatar } from '../../../../components/images';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { truncateText } from 'src/utils/formatText';

// ----------------------------------------------------------------------

export default function BlogTableRow({ row, selected, onEditRow, onDeleteRow, onUpdateStatus }) {
    const theme = useTheme();

    const { title, status, image, type, imageUrl } = row;

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected} key={row?._id}>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={title} color={createAvatar(title).color} sx={{ mr: 2 }} src={image ? imageUrl : ''}>
                    {createAvatar(title).title}
                </Avatar>

                <Stack>
                    <Tooltip title={title} placement='right'>
                        <Typography variant="subtitle2" noWrap>
                            {truncateText(title, 5)}
                            {type === 'news' ? <Label sx={{ ml: 1 }} color='primary' variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}>News</Label> : ''}
                        </Typography>
                    </Tooltip>
                </Stack>
            </TableCell>

            <TableCell align="left">
                <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={
                        (status === 1 && 'success') ||
                        (status === 0 && 'error')
                    }
                    onClick={() => {
                        onUpdateStatus();
                        handleCloseMenu();
                    }}
                    sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                >
                    {status === 1 ? 'Active' : 'Inactive'}
                </Label>
            </TableCell>

            <TableCell align="center">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    onDeleteRow();
                                    handleCloseMenu();
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                <Iconify icon={'eva:trash-2-outline'} />
                                Delete
                            </MenuItem>

                            <MenuItem
                                onClick={() => {
                                    onEditRow();
                                    handleCloseMenu();
                                }}
                            >
                                <Iconify icon={'eva:edit-fill'} />
                                Edit
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}
