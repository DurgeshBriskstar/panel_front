// @mui
import { Alert, Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFRemoveSingleFile, RHFUploadAvatar } from 'src/components/hook-form';
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
            }
        },
        [setValue]
    );

    const handleRemove = useCallback(
        () => {
            setFileInfo(null);
            setValue('image', null);
            clearErrors('image');
        },
        [setValue]
    );

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
        >
            <RHFRemoveSingleFile
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
                            <Alert severity={fileInfo.size > 1000000 ? 'error' : 'success'} variant="outlined">
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Name: {fileInfo.name} <br />
                                    Size: {fData(fileInfo.size)} <br />
                                    {fileInfo.size > 1000000 &&
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