import PropTypes from 'prop-types';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// redux
import { dispatch } from '../../redux/store';
//
import { PLUGINS, FONT_FAMILY, HEADINGS } from './EditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.grey[500_32]}`,
    '&:hover': {
        borderColor: theme.palette.grey[800],
    },
    '& .sun-editor': {
        border: 'none',
        backgroundColor: 'transparent',
        '& .se-toolbar': {
            outline: 'none',
            backgroundColor: 'transparent',
            borderBottom: `solid 1px ${theme.palette.grey[500_32]}`,
        },
        '& .se-resizing-bar': {
            display: 'none',
        },
        '& .se-wrapper-inner': {
            backgroundColor: 'transparent',
            minHeight: '200px !important',
            maxHeight: '200px !important',
            overflow: 'auto',
        },
        '& .se-wrapper-code': {
            backgroundColor: 'black',
        },
        '& .se-wrapper .se-placeholder': {
            ...theme.typography.body1,
            color: theme.palette.text.disabled,
        },
        '& .custom-merge-tag-button': { // <--- add custom-merge-tag-button class style here
            // your custom styles here
            width: '60px',
        },
        '& .custom-merge-tag-button .fa-angle-down': {
            fontFamily: "Font Awesome 5 Free",
        },
        '& .se-dialog-image': {
            marginTop: '100px !important',
        },
        '& .se-dialog-content': {
            marginTop: '100px !important',
        },
    },
}));

// ----------------------------------------------------------------------

Editor.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    helperText: PropTypes.node,
    sx: PropTypes.object,
};

export default function Editor({
    id = 'minimal-quill',
    error,
    value,
    onChange,
    helperText,
    sx,
    ...other
}) {
    const modules = {
        showPathLabel: false,
        placeholder: "Write something awesome...",
        plugins: PLUGINS,
        buttonList: [
            ["font", "fontSize", "formatBlock"],
            [{
                name: 'merge_tag',
                dataCommand: 'merge_tag',
                // buttonClass: '',
                buttonClass: 'custom-merge-tag-button',
                title: 'Variable',
                dataDisplay: 'submenu',
                innerHTML: '<span style="font-color:#ffff;">Variable</span><i class="fa fa-angle-down"></i>',
            }],
            ["paragraphStyle"],
            ["bold", "underline", "italic"],
            ["fontColor", "hiliteColor"],
            ["align", "horizontalRule", "list"],
            ["link", "image", "video"],
            ["codeView", "preview"],
            ["undo", "redo"],
        ],
        formats: HEADINGS,
        font: FONT_FAMILY,
    }

    const handleImageUploadBefore = (files, info, uploadHandler) => {
        const file = files[0];
        if (file != null) {
            try {
                // dispatch(uploadTempImage(file)).then((res) => {
                //     const response = {
                //         result: [{
                //             url: res.data,
                //             name: file.name,
                //             size: file.size,
                //         }]
                //     }

                //     uploadHandler(response);
                // })
            } catch (err) {
                uploadHandler(err.toString());
            }
        }
    }

    // function uploadTempImage(data) {
    //     return async () => {
    //         try {
    //             // ===================== Automation with File =====================
    //             const formData = new FormData();
    //             formData.append('file', data);

    //             const response = await axios.post('/api/review/template/image', formData, {
    //                 headers: { 'Content-Type': 'multipart/form-data' },
    //             });
    //             // ===================== Automation end =====================
    //             if (response.success) {
    //                 return Promise.resolve(response);
    //             }
    //             return Promise.reject(response);
    //         } catch (error) {
    //             return Promise.reject(error);
    //         }
    //     };
    // }

    return (
        <div>
            <RootStyle
                sx={{
                    ...(error && {
                        border: (theme) => `solid 1px ${theme.palette.error.main}`,
                    }),
                    ...sx,
                }}
            >
                <SunEditor
                    id={id}
                    {...other}
                    defaultValue={value}
                    setOptions={modules}
                    placeholder="Type something..."
                    onChange={(editor) => onChange(editor)}
                    onImageUploadBefore={handleImageUploadBefore}
                />
            </RootStyle>
            {helperText && helperText}
        </div>
    );
}
