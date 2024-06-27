// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFCheckbox } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Preferences() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <Box
            sx={{
                display: 'column',
                alignItems: 'center',
            }}
        >
            <RHFCheckbox name="active" label="Active" />
            <RHFCheckbox name="isNews" label="Is News ?" />
            <RHFCheckbox name="enableComments" label="Enable comments ?" />
        </Box>
    )
}