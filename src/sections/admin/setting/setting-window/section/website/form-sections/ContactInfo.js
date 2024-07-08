// @mui
import { Box, InputAdornment } from '@mui/material';
// Hook Form
import { RHFPhone, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

export default function ContactInfo() {

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 2,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
        >
            <RHFTextField
                name="primaryEmail"
                label="Primary email address"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'noto:envelope'} width={24} height={24} />
                        </InputAdornment>
                    ),
                }}
            />
            <RHFTextField
                name="secondaryEmail"
                label="Email address"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'noto:envelope'} width={24} height={24} />
                        </InputAdornment>
                    ),
                }}
            />

            <RHFPhone name="primaryPhone" label="Contact No." />
            <RHFPhone name="secondaryPhone" label="Alternate Contact No." />
            <RHFPhone name="whatsAppPhone" label="Whats'app number" />
        </Box>
    )
}