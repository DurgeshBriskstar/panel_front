// @mui
import { Box, Typography, useTheme } from '@mui/material';
// Hook Form
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------

export default function SecurityInfo() {
    const theme = useTheme();

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

                <Typography variant="caption" sx={{ color: `${theme.palette.text.secondary}`, display: 'flex' }}>
                    <Iconify icon={'ic:baseline-info'} width={16} height={16} />
                    &nbsp;Password must contain at least 6 characters, including Upper/Lower case, number and special character.
                </Typography>

                <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />
            </Box>
        </>
    )
}