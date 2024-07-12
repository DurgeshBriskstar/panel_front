// @mui
import { Box, MenuItem } from '@mui/material';
// Hook Form
import { RHFDatePicker, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { DEFAULT_GENDER } from 'src/config';
import { FDateFormat } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function PersonalInfo() {
    const DateFormat = FDateFormat();

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    rowGap: 2,
                    columnGap: 2,
                    mb: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
            >
                <RHFTextField
                    name="firstName"
                    label="First Name"
                    inputProps={{ maxLength: 50 }}
                />
                <RHFTextField
                    name="lastName"
                    label="Last Name"
                    inputProps={{ maxLength: 50 }}
                />
                <RHFSelect
                    name={`gender`}
                    label="Gender"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                    {DEFAULT_GENDER.map((gender) => (
                        <MenuItem
                            key={gender.id}
                            value={gender.value}
                            sx={{
                                mx: 1,
                                my: 0.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                textTransform: 'capitalize',
                            }}
                        >
                            {gender.name}
                        </MenuItem>
                    ))}
                </RHFSelect>
                <RHFDatePicker name="dateOfBirth" format={DateFormat} label="Date of Birth" />
            </Box>
            <RHFTextField name="about" multiline rows={4} label="About" />
        </>
    )
}