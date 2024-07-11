import { capitalCase } from 'change-case';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
    getGraphics,
    deleteGraphic,
    closeDeleteModal,
    closeStatusModal,
    updateGraphicStatus,
    graphicModel,
} from '../../../redux/slices/graphic';
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
import { GraphicTableRow, GraphicTableToolbar } from '../../../sections/admin/graphic/list';
import RenderCanvasImage from 'src/components/images/RenderCanvasImage';
import ICON from 'src/assets/images/sdc.png';

// ----------------------------------------------------------------------

// status options
const STATUS_OPTIONS = [
    { key: "", value: "All" },
    { key: "1", value: "Active" },
    { key: "0", value: "Inactive" },
];

// table head
const TABLE_HEAD = [
    { id: 'title', label: 'Graphic', align: 'left', sort: true },
    { id: 'status', label: 'Status', align: 'left', sort: true },
    { id: '', label: 'Action', align: 'center' },
];

export default function GraphicList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const [cardData, setCardData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [graphicId, setGraphicId] = useState(null);
    const [graphicStatus, setGraphicStatus] = useState(null);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState("");
    const { graphics, count, isDeleteModal, isStatusModal, isLoading } = useSelector((state) => state.graphic);
    const [icon, setIcon] = useState({ name: 'round', image: ICON });
    const [cardView, setCardView] = useState(false);

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
        dispatch(getGraphics({
            page,
            order,
            search: search,
            orderBy,
            rowsPerPage,
            status: status,
        }));
    }, [dispatch, page, order, orderBy, rowsPerPage, status, search]);

    useEffect(() => {
        if (graphics?.length) {
            let tempArr = [];
            graphics?.map((graphic) => {
                if (graphic?.imageUrl) {
                    const item = {
                        title: graphic?.title,
                        image: graphic?.imageUrl,
                        description: graphic?.shortDesc,
                        footerText: graphic?.footerText,
                        palette: graphic?.palette || {},
                        download: true
                    };

                    tempArr.push(item);
                }
            });

            setCardData(tempArr);
            setTableData(graphics);
        } else {
            setTableData([]);
            setCardData([]);
        }

    }, [graphics]);

    useEffect(() => {
        location.pathname.includes('card') ? setCardView(true) : setCardView(false);
    }, [location])

    const handleSearch = (search) => {
        setSearch(search);
        setPage(0);
    };

    const handleStatus = (event) => {
        setStatus(event.target.value);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        setGraphicId(id);
        dispatch(graphicModel(id, "delete"));
    };

    const handleUpdateStatus = (id, status) => {
        setGraphicId(id);
        setGraphicStatus(status);
        dispatch(graphicModel(id, "status"));
    };

    const handleEditRow = (id) => {
        navigate(PATH_ADMIN.graphic.graphicEdit(capitalCase(id)));
    };

    const handleDeleteModal = () => {
        dispatch(closeDeleteModal());
    };

    const handleStatusModal = () => {
        dispatch(closeStatusModal());
    };

    const confirmDelete = () => {
        dispatch(deleteGraphic(graphicId)).then(originalPromiseResult => {
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
        dispatch(updateGraphicStatus({ id: graphicId, status: graphicStatus })).then(originalPromiseResult => {
            enqueueSnackbar(originalPromiseResult.message, { variant: 'success' });
            handleStatusModal();
        }).catch(rejectedValueOrSerializedError => {
            enqueueSnackbar(rejectedValueOrSerializedError.message, { variant: 'error' });
            handleStatusModal();
        });
    };

    const isNotFound = count < 1;

    return (
        <Page title="Graphic: List">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Graphics"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Graphics' },
                    ]}
                    action={
                        <>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={cardView ? PATH_ADMIN.graphic.list : PATH_ADMIN.graphic.card}
                                startIcon={<Iconify icon={cardView ? 'eva:list-fill' : 'eva:eye-fill'} />}
                                sx={{ mr: 2 }}
                            >
                                {cardView ? 'List View' : 'Card View'}
                            </Button>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to={PATH_ADMIN.graphic.new}
                                startIcon={<Iconify icon={'eva:plus-fill'} />}
                            >
                                Add Graphic
                            </Button>
                        </>
                    }
                />

                <Card>
                    <CardHeader title="All Graphics" sx={{ mb: 3 }} />
                    <GraphicTableToolbar
                        search={search}
                        filterStatus={status}
                        onSearch={handleSearch}
                        onFilterStatus={handleStatus}
                        optionsStatus={STATUS_OPTIONS}
                    />
                    <Scrollbar>
                        {
                            (cardView && cardData) ?
                                <RenderCanvasImage images={cardData} icon={icon} />
                                :
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
                                                <GraphicTableRow
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
                        }
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
                        <DeleteDialog title={'Delete Graphic'} onConfirm={confirmDelete} onClose={handleDeleteModal} loading={isLoading} />
                    </DialogAnimate>

                    <DialogAnimate open={isStatusModal} width="sm">
                        <StatusDialog title={'Update Graphic Status'} onConfirm={confirmStatus} onClose={handleStatusModal} loading={isLoading} />
                    </DialogAnimate>
                </Card>
            </Container>
        </Page>
    )
}