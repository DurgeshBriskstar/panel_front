// @mui
import { Box } from '@mui/material';
// Hook Form
import { RHFCheckbox } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Preferences() {

    return (
        <Box
            sx={{
                display: 'column',
                alignItems: 'center',
            }}
        >
            <RHFCheckbox name="active" label="Active" />
        </Box>
    )
}