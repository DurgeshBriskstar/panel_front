// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import RHFColorPicker from 'src/components/hook-form/RHFColorPicker';

// ----------------------------------------------------------------------

export default function ColorPalette() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <Box
            sx={{
                display: 'grid',
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
        >
            <RHFColorPicker name="palette.title" label="Title color" />
            <RHFColorPicker name="palette.description" label="Description color" />
            <RHFColorPicker name="palette.background" label="Background color" />
            <RHFColorPicker name="palette.highlight" label="Highlight color" />
        </Box>
    )
}