import { useParams } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
// section
import UserAccount from './section/UserAccount';
import WebsiteSetting from './section/WebsiteSetting';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

export default function ChatWindow() {
    const { tabKey } = useParams();
    const { user } = useAuth();

    return (
        <Box sx={{ flexGrow: 1, minWidth: '1px', display: 'flex', overflow: 'hidden' }}>
            <Stack sx={{ flexGrow: 1 }}>
                {tabKey === 'account-setting' && <UserAccount isEdit user={user} />}
                {tabKey === 'website-setting' && <WebsiteSetting />}
            </Stack>
        </Box>
    );
}
