import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

export default function CategoryTableToolbar({
    optionsStatus,
    search,
    filterStatus,
    onSearch,
    onFilterStatus,
    filterType,
    onFilterType,
    optionsType,
}) {
    return (
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
            <TextField fullWidth select label="Status" value={filterStatus} onChange={onFilterStatus}
                SelectProps={{ MenuProps: { sx: { '& .MuiPaper-root': { maxHeight: 260 } } } }}
                sx={{ maxWidth: { md: INPUT_WIDTH }, textTransform: 'capitalize', }}
            >
                {optionsStatus.map((option) => (
                    <MenuItem
                        key={option?.key}
                        value={option?.key}
                        sx={{ mx: 1, my: 0.5, borderRadius: 0.75, typography: 'body2', textTransform: 'capitalize' }}
                    >
                        {option?.value}
                    </MenuItem>
                ))}
            </TextField>

            <TextField fullWidth select label="Type" value={filterType} onChange={onFilterType}
                SelectProps={{ MenuProps: { sx: { '& .MuiPaper-root': { maxHeight: 260 } } } }}
                sx={{ maxWidth: { md: INPUT_WIDTH }, textTransform: 'capitalize', }}
            >
                {optionsType.map((option) => (
                    <MenuItem
                        key={option?.key}
                        value={option?.key}
                        sx={{ mx: 1, my: 0.5, borderRadius: 0.75, typography: 'body2', textTransform: 'capitalize' }}
                    >
                        {option?.value}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                value={search}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
}
