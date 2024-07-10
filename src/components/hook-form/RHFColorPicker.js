import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { ColorSinglePicker } from '../color-utils';
import { DEFAULT_COLOR } from 'src/config';
import { Typography, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

RHFColorPicker.propTypes = {
    name: PropTypes.string,
};

export default function RHFColorPicker({ name, label, ...other }) {
    const theme = useTheme();
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Typography variant="body2" sx={{ my: 0, color: `${theme.palette.grey}`, textAlign: 'left' }}>{label}</Typography>
                    <ColorSinglePicker {...field} fullWidth error={!!error} helperText={error?.message} {...other} colors={DEFAULT_COLOR} />
                </>
            )}
        />
    );
}
