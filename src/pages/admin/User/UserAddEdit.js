import { useEffect } from 'react';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_ADMIN } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { getUser } from 'src/redux/slices/user';
// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import Iconify from 'src/components/Iconify';
import UserForm from 'src/sections/admin/user/UserForm';

// ----------------------------------------------------------------------

export default function UserAddEdit() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { id = '' } = useParams();
    const { themeStretch } = useSettings();
    const isEdit = pathname.includes('edit');
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(getUser(id))
        }
    }, [dispatch, id]);

    return (
        <Page title={!isEdit ? 'User: Add' : 'User: Edit'}>
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Add User' : 'Edit User'}
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Users', href: PATH_ADMIN.user.root },
                        { name: !isEdit ? 'Add User' : 'Edit User' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_ADMIN.user.list}
                            startIcon={<Iconify icon={'eva:arrowhead-left-outline'} />}
                        >
                            Back
                        </Button>
                    }
                />
                <UserForm isEdit={isEdit} user={id ? user : {}} />
            </Container>
        </Page>
    );
}