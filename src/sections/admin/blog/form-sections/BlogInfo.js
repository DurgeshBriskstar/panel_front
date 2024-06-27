// @mui
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
// Hook Form
import { useFormContext } from 'react-hook-form';
import { RHFEditor, RHFTextField, RHFTagField, RHFAutocomplete } from 'src/components/hook-form';
import { getCategories } from 'src/redux/slices/category';
import { useDispatch, useSelector } from 'src/redux/store';
// ----------------------------------------------------------------------

export default function BlogInfo() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const { watch } = useFormContext();
    const values = watch();

    useEffect(() => {
        dispatch(getCategories({
            rowsPerPage: 100,
            status: "1"
        }));
    }, []);

    useEffect(() => {
        if (categories?.length) {
            const catOptions = categories?.map(item => item.type === "category" && item?.title).filter(item => item);
            const cityOptions = categories?.map(item => item.type === "city" && item?.title).filter(item => item);
            setCategoryOptions(catOptions);
            setCityOptions(cityOptions);
        }
    }, [categories]);

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
        >
            <RHFTextField name="title" label="Blog title" />
            <RHFTextField name="shortDesc" label="Short description" multiline rows={2} />
            <RHFEditor name="description" id="description" value={values?.description} />

            <RHFTagField
                name="category"
                label="Related Categories"
                options={categoryOptions}
                optionLabel={(item) => item || ""}
            />
            <RHFTagField
                name="city"
                label="Related cities"
                options={cityOptions}
                optionLabel={(item) => item || ""}
            />
            <RHFTagField
                freeSolo
                name="tags"
                label="Related Tags"
                options={[]}
                optionLabel={(item) => item || ""}
            />
        </Box>
    )
}