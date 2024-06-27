import {
    align,
    font,
    fontColor,
    fontSize,
    formatBlock,
    hiliteColor,
    horizontalRule,
    lineHeight,
    list,
    paragraphStyle,
    table,
    template,
    textStyle,
    image,
    link
} from "suneditor/src/plugins";
// import myDropdown from "./DropDown";
import mergeTag from "./DropDown";

// ----------------------------------------------------------------------

export const FONT_FAMILY = ["Public Sans", "Arial", "Calibri", "Comic Sans", "Courier", "Garamond", "Georgia", "Impact", "Lucida Console", "Open Sans", "Sans-Serif"];

export const FONT_SIZE = [
    '8px',
    '9px',
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
];

export const HEADINGS = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

export const PLUGINS = [
    align,
    font,
    fontColor,
    fontSize,
    formatBlock,
    hiliteColor,
    horizontalRule,
    lineHeight,
    list,
    paragraphStyle,
    table,
    template,
    textStyle,
    image,
    link,
    mergeTag,
];
