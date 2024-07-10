// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function GraphicInfo() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 2,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
        >
            <RHFTextField name="title" label="Graphic title" />
            <RHFTextField name="shortDesc" label="Short description" multiline rows={2} helperText="Recommended max word count is 30." />
        </Box>
    )
}