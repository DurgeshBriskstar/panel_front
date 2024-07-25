import { useState, useEffect } from 'react';
// @mui
import {
    Card,
    CardHeader,
    Container,
    Typography,
} from '@mui/material';
// routes
import { PATH_ADMIN } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useSettings from 'src/hooks/useSettings';

// ----------------------------------------------------------------------


export default function ToolList() {
    const { themeStretch } = useSettings();
    return (
        <Page title="Tool: List">
            <Container maxWidth={themeStretch ? false : 'x1'}>
                <HeaderBreadcrumbs
                    heading="Tools"
                    links={[
                        { name: 'Dashboard', href: PATH_ADMIN.root },
                        { name: 'Tools' },
                    ]}
                    action={<></>}
                />

                <Card>
                    <CardHeader title="Google Map" sx={{ mb: 3 }} />
                </Card>
            </Container>
        </Page>
    )
}