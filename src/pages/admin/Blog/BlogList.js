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
    getBlogs,
    deleteBlog,
    closeDeleteModal,
    closeStatusModal,
    updateBlogStatus,
    blogModel,
} from '../../../redux/slices/blog';
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
import { BlogTableRow, BlogTableToolbar } from '../../../sections/admin/blog/list';

// ----------------------------------------------------------------------

// status options
const STATUS_OPTIONS = [
    { key: "", value: "All" },
    { key: "1", value: "Active" },
    { key: "0", value: "Inactive" },
];
const TYPE_OPTIONS = [
    { key: "", value: "All" },
    { key: "blog", value: "Blog" },
    { key: "news", value: "News" },
];

// table head
const TABLE_HEAD = [
    { id: 'title', label: 'Title', align: 'left', sort: true },
    { id: 'category', label: 'Category', align: 'left', sort: true },
    { id: 'city', label: 'City', align: 'left', sort: true },
    { id: 'status', label: 'Status', align: 'left', sort: true },
    { id: 'tracking', label: 'Tracking', align: 'center' },
    { id: '', label: 'Action', align: 'center' },
];

export default function BlogList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [tableData, setTableData] = useState([]);
    const [blogId, setBlogId] = useState(null);
    const [blogStatus, setBlogStatus] = useState(null);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const { blogs, count, isDeleteModal, isStatusModal, isLoading } = useSelector((state) => state.blog);

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
        dispatch(getBlogs({
            page,
            order,
            search: search,
            orderBy,
            rowsPerPage,
            status: status,
            type: type,
        }));
    }, [dispatch, page, order, orderBy, rowsPerPage, status, type, search]);

    useEffect(() => {
        setTableData(blogs)
    }, [blogs]);

    const handleSearch = (search) => {
        setSearch(search);
        setPage(0);
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
        setPage(0);
    };

    const handleType = (event) => {
        setType(event.target.value);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        setBlogId(id);
        dispatch(blogModel(id, "delete"));
    };

    const handleUpdateStatus = (id, status) => {
        setBlogId(id);
        setBlogStatus(status);
        dispatch(blogModel(id, "status"));
    };

    const handleEditRow = (id) => {
        navigate(PATH_ADMIN.blog.blogEdit(capitalCase(id)));
    };

    const handleDeleteModal = () => {
        dispatch(closeDeleteModal());
    };

    const handleStatusModal = () => {
        dispatch(closeStatusModal());
    };

    const confirmDelete = () => {
        dispatch(deleteBlog(blogId)).then(originalPromiseResult => {
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
        dispatch(updateBlogStatus({ id: blogId, status: blogStatus })).then(originalPromiseResult => {
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            handleStatusModal();
        }).catch(rejectedValueOrSerializedError => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            handleStatusModal();
        });
    };

    const isNotFound = count < 1;

    return (
        <Page title="Blog: List">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Blogs"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Blogs' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.blog.new}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            Add Blog
                        </Button>
                    }
                />

                <Card>
                    <CardHeader title="All Blogs" sx={{ mb: 3 }} />
                    <BlogTableToolbar
                        search={search}
                        onSearch={handleSearch}
                        filterStatus={status}
                        onFilterStatus={handleStatus}
                        optionsStatus={STATUS_OPTIONS}
                        filterType={type}
                        onFilterType={handleType}
                        optionsType={TYPE_OPTIONS}
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
                                        <BlogTableRow
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
                        <DeleteDialog title={'Delete Blog'} onConfirm={confirmDelete} onClose={handleDeleteModal} loading={isLoading} />
                    </DialogAnimate>

                    <DialogAnimate open={isStatusModal} width="sm">
                        <StatusDialog title={'Update Blog Status'} onConfirm={confirmStatus} onClose={handleStatusModal} loading={isLoading} />
                    </DialogAnimate>
                </Card>
            </Container>
        </Page>
    )
}