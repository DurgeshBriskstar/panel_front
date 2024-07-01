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
import { getSlider } from '../../../redux/slices/slider';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import SliderForm from '../../../sections/admin/slider/SliderForm';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function SliderAddEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id = '' } = useParams();
    const { themeStretch } = useSettings();
    const isEdit = pathname.includes('edit');
    const { slider } = useSelector((state) => state.slider);

    useEffect(() => {
        if (id) {
            dispatch(getSlider(id))
        }
    }, [dispatch, id]);

    // handle back on back event
    const handleBack = () => {
        navigate(PATH_ADMIN.slider.list);
    };

    return (
        <Page title={!isEdit ? 'Slider: Add' : 'Slider: Edit'}>
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Add Slider' : 'Edit Slider'}
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Sliders', href: PATH_ADMIN.slider.root },
                        { name: !isEdit ? 'Add Slider' : 'Edit Slider' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.slider.list}
                            startIcon={<Iconify icon={'eva:arrowhead-left-outline'} />}
                        >
                            Back
                        </Button>
                    }
                />
                <SliderForm isEdit={isEdit} onBack={handleBack} slider={id ? slider : {}} />
            </Container>
        </Page>
    );
}