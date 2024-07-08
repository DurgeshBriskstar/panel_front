// @mui
import { Box } from '@mui/material';
// Hook Form
import { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function AddressInfo() {

    return (
        <>
            <RHFTextField name="address.streetAddress" label="Street Address" />
            <RHFTextField name="address.address" label="Address" sx={{ mt: 2 }} />
            <Box
                sx={{
                    display: 'grid',
                    rowGap: 2,
                    mt: 2,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
            >
                <RHFTextField name="address.city" label="City" />
                <RHFTextField name="address.state" label="State/Region" />
                <RHFTextField name="address.pinCode" label="Pin/Code" />
                <RHFTextField name="address.country" label="Country" />
            </Box>
        </>
    )
}