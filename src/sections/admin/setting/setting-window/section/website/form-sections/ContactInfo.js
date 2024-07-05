// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function ContactInfo() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 2,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
        >
            <RHFTextField name="primaryEmail" label="Primary email address" />
            <RHFTextField name="secondaryEmail" label="Email address" />

            <RHFTextField name="primaryPhone" label="Primary phone number" />
            <RHFTextField name="secondaryPhone" label="Secondary phone number" />
            <RHFTextField name="whatsAppPhone" label="Whats'app number" />
        </Box>
    )
}