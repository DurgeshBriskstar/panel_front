import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, IconButton,Tooltip } from '@mui/material';

//
import { Image } from '../images';
import RejectionFiles from './RejectionFiles';
import BlockContent from './BlockContent';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------
const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: `${theme.spacing(2, 1)} !important`,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------
RemoveSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
  onRemove: PropTypes.func,
};

export default function RemoveSingleFile({ error = false, file, onRemove, helperText, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  const handleRemove = () => {
    onRemove();
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
          ...(file && {
            padding: '12% 0',
          }),
          ...sx,
        }}
      >
        <input {...getInputProps()} />
        <BlockContent message={other?.dictDefaultMessage} subText={other?.defaultSubText}/> 
        {file && (
          <>
            <Image
              alt="file preview"
              src={typeof file === 'string' ? file : file.preview}
              sx={{
                top: 8,
                left: 8,
                borderRadius: 1,
                position: 'absolute',
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)',
              }}
            />
             <Tooltip title="Remove">
            <IconButton
              color="primary"
              aria-label="remove"
              onClick={(event) => {
                event.stopPropagation();
                handleRemove();
              }}
              sx={{
                top: -14,
                right: -14, // Position the cross button on the top-right corner
                borderRadius: 1,
                position: 'absolute',
              }}
            >
             <Iconify icon={'typcn:delete'} sx={{ height: '35px', width: '35px', color: 'red' }} />
            </IconButton>
            </Tooltip>
          </>
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </Box>
  );
}
