// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function SecurityInfo() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    rowGap: 2,
                    mt: 2,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
            >
                <RHFTextField name="oldPassword" type="password" label="Old Password" />

                <RHFTextField name="newPassword" type="password" label="New Password" />

                <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />
            </Box>
        </>
    )
}