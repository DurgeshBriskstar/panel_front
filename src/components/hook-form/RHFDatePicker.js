import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
    name: PropTypes.string,
};

export default function RHFDatePicker({ name, format, minDate, ...other }) {
    const { control, setValue } = useFormContext();

    const onDateChange = (val) => {
        if (val) {
            setValue(name, val);
        }
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...field}
                    label="Select Date"
                    minDate={minDate || ""}
                    inputFormat={format}
                    defaultCalendarMonth={new Date()}
                    onChange={onDateChange}
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
                                placeholder: format.toUpperCase(),
                            }}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                        />
                    )}
                    {...other}
                />
            )}
        />
    );
}