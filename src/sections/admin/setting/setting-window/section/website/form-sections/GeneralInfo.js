// @mui
import { Box } from '@mui/material';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function GeneralInfo() {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <>
            <RHFTextField name="title" label="Title" />
            <Box
                sx={{
                    display: 'grid',
                    my: 2,
                    rowGap: 2,
                    columnGap: 2,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
            >

                <RHFTextField name="subTitle" label="Sub title" />
                <RHFTextField name="category" label="Category" />
            </Box>
            <RHFTextField name="about" multiline rows={4} label="About" />
        </>
    )
}