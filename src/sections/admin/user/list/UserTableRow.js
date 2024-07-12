import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, MenuItem, Link, Tooltip, Badge } from '@mui/material';
// utils
import createAvatar from '../../../../utils/createAvatar';
// components
import Label from '../../../../components/Label';
import { Avatar } from '../../../../components/images';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { fPhone } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onDeleteRow, onUpdateStatus }) {
    const theme = useTheme();

    const { firstName, lastName, email, dateOfBirth, gender, image, imageUrl, status, role, primaryPhone, loginCount, lastLoginAt } = row;

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected} key={row?._id}>
            <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={`${firstName}${lastName}`} color={createAvatar(firstName, lastName).color} sx={{ mr: 2 }} src={image ? imageUrl : ''}>
                    {createAvatar(firstName, lastName).title}
                </Avatar>

                <Stack>
                    <Typography variant="subtitle2" noWrap>
                        {`${firstName} ${lastName}`}
                        {role === 'admin' ? <Label sx={{ ml: 1 }} color='primary' variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}>Admin</Label> : ''}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell align="left"><Link href={`mailTo:${email}`} underline="none">{email}</Link></TableCell>
            <TableCell align="left"><Link href={`tel:${primaryPhone}`} underline="none">{fPhone(primaryPhone)}</Link></TableCell>
            <TableCell align="center">
                <Tooltip title={`Last login at: ${lastLoginAt}`} placement="top" arrow>
                    {loginCount || '-'}
                    <Iconify icon={'ic:baseline-info'} width={16} height={16} />
                </Tooltip>
            </TableCell>

            <TableCell align="left">
                {
                    role !== 'admin' &&
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
                }
            </TableCell>

            <TableCell align="center">
                {
                    role !== 'admin' &&
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
                }
            </TableCell>
        </TableRow>
    );
}
