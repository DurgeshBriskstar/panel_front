import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, Autocomplete } from '@mui/material';

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
    inputChange: PropTypes.func,
    optionLabel: PropTypes.func,
    options: PropTypes.array,
    name: PropTypes.string,
    disabled: PropTypes.bool,
};

export default function RHFAutocomplete({ name, multiple = false, disabled, options, optionLabel, inputChange, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    multiple={multiple}
                    disableClearable
                    options={options}
                    onChange={inputChange}
                    getOptionLabel={optionLabel}
                    disabled={disabled}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            {...other}
                        />
                    )}
                />
            )}
        />
    );
}
