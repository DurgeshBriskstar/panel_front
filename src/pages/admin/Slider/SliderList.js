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
    getSliders,
    deleteSlider,
    closeDeleteModal,
    closeStatusModal,
    updateSliderStatus,
    sliderModel,
} from '../../../redux/slices/slider';
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
import { SliderTableRow, SliderTableToolbar } from '../../../sections/admin/slider/list';

// ----------------------------------------------------------------------

// status options
const STATUS_OPTIONS = [
    { key: "", value: "All" },
    { key: "1", value: "Active" },
    { key: "0", value: "Inactive" },
];

// table head
const TABLE_HEAD = [
    { id: 'title', label: 'Slider', align: 'left', sort: true },
    { id: 'status', label: 'Status', align: 'left', sort: true },
    { id: '', label: 'Action', align: 'center' },
];

export default function SliderList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [tableData, setTableData] = useState([]);
    const [sliderId, setSliderId] = useState(null);
    const [sliderStatus, setSliderStatus] = useState(null);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState("");
    const { sliders, count, isDeleteModal, isStatusModal, isLoading } = useSelector((state) => state.slider);

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
        dispatch(getSliders({
            page,
            order,
            search: search,
            orderBy,
            rowsPerPage,
            status: status,
        }));
    }, [dispatch, page, order, orderBy, rowsPerPage, status, search]);

    useEffect(() => {
        setTableData(sliders)
    }, [sliders]);

    const handleSearch = (search) => {
        setSearch(search);
        setPage(0);
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        setSliderId(id);
        dispatch(sliderModel(id, "delete"));
    };

    const handleUpdateStatus = (id, status) => {
        setSliderId(id);
        setSliderStatus(status);
        dispatch(sliderModel(id, "status"));
    };

    const handleEditRow = (id) => {
        navigate(PATH_ADMIN.slider.sliderEdit(capitalCase(id)));
    };

    const handleDeleteModal = () => {
        dispatch(closeDeleteModal());
    };

    const handleStatusModal = () => {
        dispatch(closeStatusModal());
    };

    const confirmDelete = () => {
        dispatch(deleteSlider(sliderId)).then(originalPromiseResult => {
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
        dispatch(updateSliderStatus({ id: sliderId, status: sliderStatus })).then(originalPromiseResult => {
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            handleStatusModal();
        }).catch(rejectedValueOrSerializedError => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            handleStatusModal();
        });
    };

    const isNotFound = count < 1;

    return (
        <Page title="Slider: List">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Sliders"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Sliders' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.slider.new}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            Add Slider
                        </Button>
                    }
                />

                <Card>
                    <CardHeader title="All Sliders" sx={{ mb: 3 }} />
                    <SliderTableToolbar
                        search={search}
                        filterStatus={status}
                        onSearch={handleSearch}
                        onFilterStatus={handleStatus}
                        optionsStatus={STATUS_OPTIONS}
                    />
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
                                        <SliderTableRow
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
                        <DeleteDialog title={'Delete Slider'} onConfirm={confirmDelete} onClose={handleDeleteModal} loading={isLoading} />
                    </DialogAnimate>

                    <DialogAnimate open={isStatusModal} width="sm">
                        <StatusDialog title={'Update Slider Status'} onConfirm={confirmStatus} onClose={handleStatusModal} loading={isLoading} />
                    </DialogAnimate>
                </Card>
            </Container>
        </Page>
    )
}