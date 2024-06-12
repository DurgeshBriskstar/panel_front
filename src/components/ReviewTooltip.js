import {
    Tooltip,
    tooltipClasses,
    styled,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
// ----------------------------------------------------------------------

ReviewTooltip.propTypes = {
    title: PropTypes.string.isRequired,
  };

export default function ReviewTooltip({title}) {

    const ReviewTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#fff",
            color: "black",
            maxWidth: 255,
            fontSize: theme.typography.pxToRem(12),
            border: "1px solid #dadde9"
        }
    }));

return(
    <ReviewTooltip
    title={title}
>
    <Typography sx={{
        whiteSpace: 'nowrap',
        maxWidth: '255px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }}>{title}</Typography>
</ReviewTooltip>
)
}
