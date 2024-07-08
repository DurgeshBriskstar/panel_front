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
        <>
            <Box
                sx={{
                    display: 'grid',
                    rowGap: 3,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
            >
                <RHFDatePicker name="publishDate" minDate={new Date()} format={DateFormat} label="Publish Date" />
                <RHFTextField name="source" label="Source" />
            </Box>
            <Box
                sx={{
                    mt: 2,
                    display: 'grid',
                    rowGap: 3,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
            >
                <RHFTextField name="sourceUrl" label="Source url" />
            </Box>
        </>
    )
}