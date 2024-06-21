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
import { getBlog } from '../../../redux/slices/blog';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import BlogForm from '../../../sections/admin/blog/BlogForm';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

export default function Blog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id = '' } = useParams();
    const { themeStretch } = useSettings();
    const isEdit = pathname.includes('edit');
    const { blog } = useSelector((state) => state.blog);

    useEffect(() => {
        if (id) {
            dispatch(getBlog(id))
        }
    }, [dispatch, id]);

    // handle back on back event
    const handleBack = () => {
        navigate(PATH_ADMIN.blog.list);
    };

    return (
        <Page title={!isEdit ? 'Blog: Add' : 'Blog: Edit'}>
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Add Blog' : 'Edit Blog'}
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Blogs', href: PATH_ADMIN.blog.root },
                        { name: !isEdit ? 'Add Blog' : 'Edit Blog' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.blog.list}
                            startIcon={<Iconify icon={'eva:arrowhead-left-outline'} />}
                        >
                            Back
                        </Button>
                    }
                />
                <BlogForm isEdit={isEdit} onBack={handleBack} blog={id ? blog : {}} />
            </Container>
        </Page>
    );
}