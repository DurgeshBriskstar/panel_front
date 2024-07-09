// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFTextField, RHFTagField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function SeoInfo() {
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
            <RHFTagField
                name="metaKeywords"
                label="Meta keywords"
                freeSolo
                options={[]}
                optionLabel={(item) => item || ""}
            />
            <RHFTextField name="metaTitle" label="Meta title" />
            <RHFTextField name="metaDesc" multiline rows={4} label="Meta description" />
        </Box>
    )
}