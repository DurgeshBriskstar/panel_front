import { useEffect } from 'react';
import { Link as RouterLink, useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getGraphic } from '../../../redux/slices/graphic';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import GraphicForm from '../../../sections/admin/graphic/GraphicForm';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function GraphicAddEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id = '' } = useParams();
    const { themeStretch } = useSettings();
    const isEdit = pathname.includes('edit');
    const { graphic } = useSelector((state) => state.graphic);

    useEffect(() => {
        if (id) {
            dispatch(getGraphic(id))
        }
    }, [dispatch, id]);

    // handle back on back event
    const handleBack = () => {
        navigate(PATH_ADMIN.graphic.list);
    };

    return (
        <Page title={!isEdit ? 'Graphic: Add' : 'Graphic: Edit'}>
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Add Graphic' : 'Edit Graphic'}
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Graphics', href: PATH_ADMIN.graphic.root },
                        { name: !isEdit ? 'Add Graphic' : 'Edit Graphic' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.graphic.list}
                            startIcon={<Iconify icon={'eva:arrowhead-left-outline'} />}
                        >
                            Back
                        </Button>
                    }
                />
                <GraphicForm isEdit={isEdit} onBack={handleBack} graphic={id ? graphic : {}} />
            </Container>
        </Page>
    );
}