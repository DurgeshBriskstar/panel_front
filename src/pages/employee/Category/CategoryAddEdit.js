import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_EMPLOYEE } from '../../../routes/paths';
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
        navigate(PATH_EMPLOYEE.category.list);
    };

    return (
        <Page title={!isEdit ? 'Category: Add' : 'Category: Edit'}>
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Add Category' : 'Edit Category'}
                    links={[
                        { name: 'Dashboard', href: PATH_EMPLOYEE.root },
                        { name: 'Categories', href: PATH_EMPLOYEE.category.root },
                        { name: !isEdit ? 'Add Category' : 'Edit Category' },
                    ]}
                />
                <CategoryForm isEdit={isEdit} currentCategory={id && category || {}} onBack={handleBack} />
            </Container>
        </Page>
    );
}