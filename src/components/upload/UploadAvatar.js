import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';
// @mui
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { Image } from '../images';
import Iconify from '../Iconify';
import RejectionFiles from './RejectionFiles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    width: 144,
    height: 144,
    margin: 'auto',
    borderRadius: '50%',
    padding: theme.spacing(1),
    border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const DropZoneStyle = styled('div')({
    zIndex: 0,
    width: '100%',
    height: '100%',
    outline: 'none',
    display: 'flex',
    borderRadius: '50%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': { width: '100%', height: '100%' },
    '&:hover': {
        cursor: 'pointer',
        '& .placeholder': {
            zIndex: 9,
            borderRadius: '50%',
        },
    },
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.neutral,
    transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    borderRadius: '50%',
    '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

UploadAvatar.propTypes = {
    error: PropTypes.bool,
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onRemove: PropTypes.func,
    helperText: PropTypes.node,
    sx: PropTypes.object,
};

export default function UploadAvatar({ error, file, onRemove, helperText, sx, ...other }) {
    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        multiple: false,
        ...other,
    });

    return (
        <>
            <RootStyle
                sx={{
                    ...((isDragReject || error) && {
                        borderColor: 'error.light',
                    }),
                    ...sx,
                }}
            >
                <DropZoneStyle
                    {...getRootProps()}
                    sx={{
                        ...(isDragActive && { opacity: 0.72 }),
                    }}
                >
                    <input {...getInputProps()} />

                    {file &&
                        <Box>
                            <Image alt="avatar" src={isString(file) ? file : file.preview} sx={{ width: '100%', height: '100%', zIndex: 8, borderRadius: '50%', }} />
                            <Tooltip title="Remove">
                                <IconButton
                                    color="primary"
                                    aria-label="remove"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onRemove();
                                    }}
                                    sx={{
                                        p: 0,
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        bgcolor: 'background.paper',
                                        zIndex: 10,
                                        '&:hover': { bgcolor: 'common.white', color: 'error.main' },
                                    }}
                                >
                                    <Iconify icon={'typcn:delete'} sx={{ height: '35px', width: '35px', color: 'red' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }

                    <PlaceholderStyle
                        className="placeholder"
                        sx={{
                            ...(file && {
                                opacity: 0,
                                color: 'common.white',
                                bgcolor: 'grey.900',
                                '&:hover': { opacity: 0.72 },
                            }),
                            ...((isDragReject || error) && {
                                bgcolor: 'error.lighter',
                            }),
                        }}
                    >
                        <Iconify icon={'ic:round-add-a-photo'} sx={{ width: 24, height: 24, mb: 1 }} />
                        <Typography variant="caption">{file ? 'Update photo' : 'Upload photo'}</Typography>
                    </PlaceholderStyle>
                </DropZoneStyle>
            </RootStyle>

            {helperText && helperText}

            {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        </>
    );
}
