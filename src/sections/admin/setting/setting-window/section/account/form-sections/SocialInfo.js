// @mui
import { Box, InputAdornment } from '@mui/material';
// Hook Form
import { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
// ----------------------------------------------------------------------
const SOCIAL_LINKS = [
    {
        value: 'facebookLink',
        icon: <Iconify icon={'logos:facebook'} width={24} height={24} />,
    },
    {
        value: 'instagramLink',
        icon: <Iconify icon={'skill-icons:instagram'} width={24} height={24} />,
    },
    {
        value: 'linkedinLink',
        icon: <Iconify icon={'logos:linkedin-icon'} width={24} height={24} />,
    },
    {
        value: 'twitterLink',
        icon: <Iconify icon={'logos:twitter'} width={24} height={24} />,
    },
    {
        value: 'pinterestLink',
        icon: <Iconify icon={'logos:pinterest'} width={24} height={24} />,
    },
    {
        value: 'youtubeLink',
        icon: <Iconify icon={'logos:youtube-icon'} width={24} height={24} />,
    },
];

export default function SocialInfo() {

    return (
        <Box
            sx={{
                display: 'grid',
                rowGap: 2,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
        >
            {SOCIAL_LINKS.map((link) => (
                <RHFTextField
                    key={link.value}
                    name={`socialLinks.${link.value}`}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
                    }}
                />
            ))}
        </Box>
    )
}