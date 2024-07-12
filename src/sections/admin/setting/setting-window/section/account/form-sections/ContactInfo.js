// @mui
import { Box, InputAdornment } from '@mui/material';
import { useFormContext } from 'react-hook-form';
// Hook Form
import { RHFPhone, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

export default function ContactInfo() {
    const { watch, getValues } = useFormContext();
    const values = getValues();

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
                name="email"
                label="Primary email address"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'noto:envelope'} width={24} height={24} />
                        </InputAdornment>
                    ),
                }}
                disabled={values?.email !== ''}
            />
            <RHFTextField
                name="secondaryEmail"
                label="Secondary email address"
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
        </Box>
    )
}