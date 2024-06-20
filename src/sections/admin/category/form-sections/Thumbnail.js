// @mui
import { Alert, Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFUploadAvatar } from 'src/components/hook-form';
import { fData } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

export default function Thumbnail() {
    const [fileInfo, setFileInfo] = useState(null);
    const { watch, setValue, setError, clearErrors, formState: { errors } } = useFormContext();
    const values = watch();

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setFileInfo(file);
                setValue('image', Object.assign(file, { preview: URL.createObjectURL(file) }));
                if (fileInfo.size > 1000000) {
                    setError('image', { type: 'manual', message: `File size not acceptable more than ${fData(1000000)}` })
                }
            }
        },
        [setValue]
    );

    const handleRemove = useCallback(
        () => {
            setFileInfo(null);
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
                    <>
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
                            <br /> max size of {fData(1000000)}
                        </Typography>
                        {fileInfo &&
                            <Alert color={fileInfo.size > 1000000 ? 'error' : 'success'}>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Name: {fileInfo.name} <br />
                                    Size: {fData(fileInfo.size)} <br />
                                    {errors?.image && fileInfo.size > 1000000 &&
                                        `Error: File size must be less than or equal to ${fData(1000000)}`
                                    }
                                </Typography>
                            </Alert>
                        }

                    </>
                }
            />
        </Box>
    )
}