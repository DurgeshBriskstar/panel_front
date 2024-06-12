import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, styled } from '@mui/material';
// react-phone-input-2
import ReactPhoneInput from 'react-phone-input-2'

// ----------------------------------------------------------------------

RHFPhone.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const PhoneInputStyle = styled('div')(({ theme, error }) => ({
    '& .react-tel-input': {
        width: '100%',
        '& .form-control': {
            width: '100%',
            borderColor: `${error ? theme.palette.error.main : theme.palette.grey[500_32]}`,
            '&:focus': {
                borderColor: `${error ? theme.palette.error.main : theme.palette.primary.main}`,
                boxShadow: `0 0 0 1px ${error ? theme.palette.error.main : theme.palette.primary.main}`,
            },
        },
        '& .special-label': {
            '&:focus': {
                color: `${error ? theme.palette.error.main : theme.palette.primary.main}`,
            },
            left: '10px',
            color: `${error ? theme.palette.error.main : theme.palette.text.disabled}`,
        }
    }
}));

export default function RHFPhone({ name, label, disabled }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <PhoneInputStyle error={error}>
                    <ReactPhoneInput
                        {...field}
                        disabled={disabled}
                        inputExtraProps={{
                            ref
                        }}
                        specialLabel={label}
                        copyNumbersOnly={false}
                        country="gb"
                        preferredCountries={["ch", "gb"]}
                    />
                    {!!error && (
                        <FormHelperText error sx={{ px: 2, textAlign: 'start' }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </PhoneInputStyle>
            )}
        />
    );
}
