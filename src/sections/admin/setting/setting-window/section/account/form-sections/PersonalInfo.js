// @mui
import { Box, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// Hook Form
import { Controller, useFormContext } from 'react-hook-form';
import { RHFPhone, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { DEFAULT_DATE, DEFAULT_GENDER } from 'src/config';
import { FDateFormat } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function PersonalInfo() {
    const { control } = useFormContext();
    const DateFormat = FDateFormat();

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    rowGap: 3,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
            >
                <RHFTextField
                    name="firstName"
                    label="First Name"
                    inputProps={{ maxLength: 50 }}
                    autoFocus
                />
                <RHFTextField
                    name="lastName"
                    label="Last Name"
                    inputProps={{ maxLength: 50 }}
                />
                <RHFTextField name="email" label="Email" inputProps={{ maxLength: 50 }} />

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
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    marginTop: 3,
                    gridTemplateRows: { sm: 'repeat(1, 1fr)' },
                }}
            >
                <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            {...field}
                            label="Date of Birth"
                            inputFormat={DateFormat}
                            maxDate={DEFAULT_DATE}
                            defaultCalendarMonth={DEFAULT_DATE}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!error}
                                    helperText={
                                        error ? error?.message : ''
                                    }
                                    inputProps={{
                                        ...params.inputProps,
                                        placeholder: DateFormat.toUpperCase(),
                                    }}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                            )}
                        />
                    )}
                />
            </Box>
        </>
    )
}