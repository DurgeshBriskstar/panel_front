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
import { PATH_BRANCH } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable from '../../../hooks/useTable';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
    getCategories,
    deleteCategory,
    closeDeleteModal,
    closeStatusModal,
    updateCategoryStatus,
    categoryModel,
} from '../../../redux/slices/category';
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
import { CategoryTableRow } from '../../../sections/admin/category/list';

// ----------------------------------------------------------------------

// table head
const TABLE_HEAD = [
    { id: 'title', label: 'Category', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '', label: 'Action', align: 'center' },
];

export default function CategoryList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [tableData, setTableData] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryStatus, setCategoryStatus] = useState(null);
    const { categories, count, isDeleteModal, isStatusModal, isLoading } = useSelector((state) => state.category);

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
        dispatch(getCategories({
            "page": page,
            "order": order,
            "search": "",
            "orderBy": orderBy,
            "rowsPerPage": rowsPerPage,
            "status": "",
        }));
    }, [dispatch, page, order, orderBy, rowsPerPage, count]);

    useEffect(() => {
        setTableData(categories)
    }, [categories]);

    // handle delete row onDeleteRow event
    const handleDeleteRow = (id) => {
        setCategoryId(id);
        dispatch(categoryModel(id, "delete"));
    };

    // handle update status onStatusUpdate event
    const handleUpdateStatus = (id, status) => {
        setCategoryId(id);
        setCategoryStatus(status);
        dispatch(categoryModel(id, "status"));
    };

    // handle edit row onEditRow event
    const handleEditRow = (id) => {
        navigate(PATH_BRANCH.category.categoryEdit(capitalCase(id)));
    };

    // handle delete modal
    const handleDeleteModal = () => {
        dispatch(closeDeleteModal());
    };

    // handle status modal
    const handleStatusModal = () => {
        dispatch(closeStatusModal());
    };

    // confirm delete onConfirm event
    const confirmDelete = () => {
        // setLoading(true);
        dispatch(deleteCategory(categoryId)).then(originalPromiseResult => {
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
        dispatch(updateCategoryStatus({ id: categoryId, isActive: categoryStatus })).then(originalPromiseResult => {
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            handleStatusModal();
        }).catch(rejectedValueOrSerializedError => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            handleStatusModal();
        });
    };

    const isNotFound = count < 1;

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <Page title="Category: List">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Categories"
                    links={[
                        { name: 'Dashboard', href: PATH_BRANCH.root },
                        { name: 'Categories' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_BRANCH.category.new}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            Add Category
                        </Button>
                    }
                />

                <Card>
                    <CardHeader title="All Categories" sx={{ mb: 3 }} />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 1000, position: 'relative' }}>
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
                                        <CategoryTableRow
                                            key={row.id}
                                            row={row}
                                            onEditRow={() => handleEditRow(row.id)}
                                            onDeleteRow={() => handleDeleteRow(row.id)}
                                            onUpdateStatus={() => handleUpdateStatus(row.id, row.isActive)}
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
                        <DeleteDialog title={'Delete Category'} onConfirm={confirmDelete} onClose={handleDeleteModal} loading={isLoading} />
                    </DialogAnimate>

                    <DialogAnimate open={isStatusModal} width="sm">
                        <StatusDialog title={'Update Category Status'} onConfirm={confirmStatus} onClose={handleStatusModal} loading={isLoading} />
                    </DialogAnimate>
                </Card>
            </Container>
        </Page>
    )
}