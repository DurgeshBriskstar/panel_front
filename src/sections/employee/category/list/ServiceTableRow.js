import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, MenuItem } from '@mui/material';
// config
import { fTime } from "../../../../utils/formatTime";
// utils
import createAvatar from '../../../../utils/createAvatar';
// components
import Label from '../../../../components/Label';
import { Avatar } from '../../../../components/images';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

ServiceTableRow.propTypes = {
    row: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onUpdateStatus: PropTypes.func,
};

export default function ServiceTableRow({ row, selected, onEditRow, onDeleteRow, onUpdateStatus }) {
    const theme = useTheme();

    const { name, amountWithCurrency, startTime, endTime, isActive, image, imageUrl, days, duration } = row;

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected}>
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={name} color={createAvatar(name).color} sx={{ mr: 2 }} src={image ? imageUrl : ''}>
                    {createAvatar(name).name}
                </Avatar>

                <Stack>
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Stack>
            </TableCell>

            <TableCell align="left">{days || "-"}</TableCell>
            <TableCell align="left">{duration || "-"}</TableCell>
            <TableCell align="left">{fTime(startTime)}</TableCell>

            <TableCell align="left">{fTime(endTime)}</TableCell>

            {/* <TableCell align="left">{DEFAULT_CURRENCY} {fCurrency(price)}</TableCell> */}
            <TableCell align="left">{amountWithCurrency}</TableCell>

            <TableCell align="left">
                <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={
                        (isActive === 1 && 'success') ||
                        (isActive === 0 && 'error')
                    }
                    onClick={() => {
                        onUpdateStatus();
                        handleCloseMenu();
                    }}
                    sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                >
                    {isActive === 1 ? 'Active' : 'Inactive'}
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
