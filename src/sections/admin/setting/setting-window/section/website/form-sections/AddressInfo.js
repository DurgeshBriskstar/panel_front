// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function AddressInfo() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <>
            <RHFTextField name="streetAddress" label="Street Address" />
            <RHFTextField name="address" label="Address" sx={{ mt: 2 }} />
            <Box
                sx={{
                    display: 'grid',
                    rowGap: 2,
                    mt: 2,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
            >
                <RHFTextField name="city" label="City" />
                <RHFTextField name="state" label="State/Region" />
                <RHFTextField name="pincode" label="Pin/Code" />
                <RHFTextField name="country" label="Country" />
            </Box>
        </>
    )
}