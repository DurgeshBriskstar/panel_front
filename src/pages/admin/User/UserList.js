import { capitalCase } from 'change-case';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Box,
    Card,
    Table,
    Button,
    TableBody,
    Container,
    CardHeader,
    TableContainer,
    TablePagination,
} from '@mui/material';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable from '../../../hooks/useTable';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
    getUsers,
    deleteUser,
    closeDeleteModal,
    closeStatusModal,
    updateUserStatus,
    userModel,
} from '../../../redux/slices/user';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { DialogAnimate } from '../../../components/animate';
import { TableHeadCustom, TableNoData } from '../../../components/table';
import { DeleteDialog, StatusDialog } from '../../../components/confirm-dialog';
import LoadingScreen from '../../../components/LoadingScreen';
// sections
import { UserTableRow, UserTableToolbar } from '../../../sections/admin/user/list';

// ----------------------------------------------------------------------

// status options
const STATUS_OPTIONS = [
    { key: "", value: "All" },
    { key: "1", value: "Active" },
    { key: "0", value: "Inactive" },
];

// table head
const TABLE_HEAD = [
    { id: 'firstName', label: 'Name', align: 'left', sort: true },
    { id: 'email', label: 'Email', align: 'left', sort: true },
    { id: 'primaryPhone', label: 'Phone', align: 'left' },
    { id: 'loginCount', label: 'Login Count', align: 'center' },
    { id: 'status', label: 'Status', align: 'left', sort: true },
    { id: '', label: 'Action', align: 'center' },
];

export default function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [tableData, setTableData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState("");
    const { users, count, isDeleteModal, isStatusModal, isLoading } = useSelector((state) => state.user);

    const {
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        onSort,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({ defaultOrderBy: 'createdAt' });

    useEffect(() => {
        dispatch(getUsers({
            page,
            order,
            search: search,
            orderBy,
            rowsPerPage,
            status: status,
        }));
    }, [dispatch, page, order, orderBy, rowsPerPage, status, search]);

    useEffect(() => {
        setTableData(users)
    }, [users]);

    const handleSearch = (search) => {
        setSearch(search);
        setPage(0);
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        setUserId(id);
        dispatch(userModel(id, "delete"));
    };

    const handleUpdateStatus = (id, status) => {
        setUserId(id);
        setUserStatus(status);
        dispatch(userModel(id, "status"));
    };

    const handleEditRow = (id) => {
        navigate(PATH_ADMIN.user.userEdit(capitalCase(id)));
    };

    const handleDeleteModal = () => {
        dispatch(closeDeleteModal());
    };

    const handleStatusModal = () => {
        dispatch(closeStatusModal());
    };

    const confirmDelete = () => {
        dispatch(deleteUser(userId)).then(originalPromiseResult => {
            if (originalPromiseResult.success && page > 0) {
                const record = (count - rowsPerPage * page);
                if (record === 1) {
                    setPage(page - 1);
                }
            }
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            handleDeleteModal();
        }).catch(rejectedValueOrSerializedError => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            handleDeleteModal();
        });
    };

    const confirmStatus = () => {
        dispatch(updateUserStatus({ id: userId, status: userStatus })).then(originalPromiseResult => {
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            handleStatusModal();
        }).catch(rejectedValueOrSerializedError => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            handleStatusModal();
        });
    };

    const isNotFound = count < 1;

    return (
        <Page title="User: List">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Users"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Users' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.user.new}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            Add User
                        </Button>
                    }
                />

                <Card>
                    <CardHeader title="All Users" sx={{ mb: 3 }} />
                    <UserTableToolbar
                        search={search}
                        filterStatus={status}
                        onSearch={handleSearch}
                        onFilterStatus={handleStatus}
                        optionsStatus={STATUS_OPTIONS}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 900, position: 'relative' }}>
                            <Table size={'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={count}
                                    onSort={onSort}
                                />
                                <TableBody>
                                    {tableData && tableData.map((row) => (
                                        <UserTableRow
                                            key={row._id}
                                            row={row}
                                            onEditRow={() => handleEditRow(row._id)}
                                            onDeleteRow={() => handleDeleteRow(row._id)}
                                            onUpdateStatus={() => handleUpdateStatus(row._id, row.status)}
                                        />
                                    ))}

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Box sx={{ position: 'relative' }}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />
                    </Box>

                    <DialogAnimate open={isDeleteModal} width="sm">
                        <DeleteDialog title={'Delete User'} onConfirm={confirmDelete} onClose={handleDeleteModal} loading={isLoading} />
                    </DialogAnimate>

                    <DialogAnimate open={isStatusModal} width="sm">
                        <StatusDialog title={'Update User Status'} onConfirm={confirmStatus} onClose={handleStatusModal} loading={isLoading} />
                    </DialogAnimate>
                </Card>
            </Container>
        </Page>
    )
}