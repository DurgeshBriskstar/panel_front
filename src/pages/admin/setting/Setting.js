// @mui
import {
    Container,
    Box
} from '@mui/material';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
    SideBar,
    SettingWindow
} from '../../../sections/admin/setting/index';

// ----------------------------------------------------------------------

export default function Setting() {
    const { themeStretch } = useSettings();

    return (
        <Page title="Settings">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Settings"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.dashboard, },
                        { name: 'Settings' },
                    ]}
                />

                <Box sx={{ display: 'flex' }}>
                    <SideBar />
                    <SettingWindow />
                </Box>
            </Container>
        </Page>
    );
}
