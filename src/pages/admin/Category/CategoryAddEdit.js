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
import { getCategory } from '../../../redux/slices/category';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import CategoryForm from '../../../sections/admin/category/CategoryForm';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function CategoryAddEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id = '' } = useParams();
    const { themeStretch } = useSettings();
    const isEdit = pathname.includes('edit');
    const { category } = useSelector((state) => state.category);

    useEffect(() => {
        if (id) {
            dispatch(getCategory(id))
        }
    }, [dispatch, id]);

    // handle back on back event
    const handleBack = () => {
        navigate(PATH_ADMIN.category.list);
    };

    return (
        <Page title={!isEdit ? 'Category: Add' : 'Category: Edit'}>
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Add Category' : 'Edit Category'}
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Categories', href: PATH_ADMIN.category.root },
                        { name: !isEdit ? 'Add Category' : 'Edit Category' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.category.list}
                            startIcon={<Iconify icon={'eva:arrowhead-left-outline'} />}
                        >
                            Back
                        </Button>
                    }
                />
                <CategoryForm isEdit={isEdit} onBack={handleBack} category={id ? category : {}} />
            </Container>
        </Page>
    );
}