// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFDatePicker, RHFTextField } from 'src/components/hook-form';
import { FDateFormat } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function IdentityInfo() {
    const DateFormat = FDateFormat();
    const { watch } = useFormContext();
    const values = watch();

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 2,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
            }}
        >
            <RHFTextField name="author" label="Author" />
            <RHFTextField name="source" label="Source" />
            <RHFDatePicker name="publishDate" format={DateFormat} label="Publish Date" />
        </Box>
    )
}