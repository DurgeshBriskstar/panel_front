import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, Chip, TextField, Typography, useTheme } from '@mui/material';
import { CloseIcon } from 'src/theme/overrides/CustomIcons';

// ----------------------------------------------------------------------

RHFTagField.propTypes = {
    name: PropTypes.string,
};

export default function RHFTagField({ name, freeSolo = false, options = [], optionLabel, onInputChange, ...other }) {
    const { control } = useFormContext();
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    multiple
                    freeSolo={freeSolo}
                    value={field.value}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={options}
                    getOptionLabel={optionLabel}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                {...getTagProps({ index })}
                                sx={{
                                    backgroundColor: theme.palette.primary.light,
                                    color: theme.palette.primary.dark
                                }}
                                key={option}
                                label={option}
                                deleteIcon={<CloseIcon style={{ color: theme.palette.primary.dark }} />}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <>
                            <TextField
                                {...params}
                                error={!!error}
                                helperText={error?.message}
                                {...other}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                }}
                            >
                                Please press enter after each keyword
                            </Typography>
                        </>
                    )}
                />
            )}
        />
    );
}
