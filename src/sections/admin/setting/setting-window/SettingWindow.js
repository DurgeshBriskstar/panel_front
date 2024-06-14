import { useParams } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
// section
import UserAccount from './section/UserAccount';
import WebsiteSetting from './section/WebsiteSetting';

// ----------------------------------------------------------------------

export default function ChatWindow() {
    const { tabKey } = useParams();

    return (
        <Box sx={{ flexGrow: 1, minWidth: '1px', display: 'flex', overflow: 'hidden' }}>
            <Stack sx={{ flexGrow: 1 }}>
                {tabKey === 'account-setting' && <UserAccount />}
                {tabKey === 'website-setting' && <WebsiteSetting />}
            </Stack>
        </Box>
    );
}
