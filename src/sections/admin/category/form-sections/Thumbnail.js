// @mui
import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFUploadAvatar } from 'src/components/hook-form';
import { fData } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

export default function Thumbnail() {
    const { watch, setValue } = useFormContext();
    const values = watch();

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setValue('image', Object.assign(file, { preview: URL.createObjectURL(file) }));
            }
        },
        [setValue]
    );

    const handleRemove = useCallback(
        () => {
            setValue('image', null);
        },
        [setValue]
    );

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 2,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
        >
            <RHFUploadAvatar
                name="image"
                accept="image/png, image/jpeg, image/jpg"
                maxSize={2000000}
                onDrop={handleDrop}
                onRemove={handleRemove}
                helperText={
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary',
                        }}
                    >
                        Allowed *.jpeg, *.jpg, *.png
                        <br /> max size of {fData(2000000)}
                    </Typography>
                }
            />
        </Box>
    )
}