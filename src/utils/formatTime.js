import {
    format,
    getTime,
    formatDistanceToNow,
    setMinutes,
    getMinutes
} from 'date-fns';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export function FDateFormat() {
    const { user } = useAuth();
    if (user.dateFormat === "MM/DD/YYYY" || user.dateFormat === null || user.dateFormat === "") {
        return 'MM/dd/yyyy';
    }
    return 'dd/MM/yyyy';
}

export function fDate(date) {
    return format(new Date(date), 'MMM dd, yyyy');
}

export default function FDateValue(date) {
    const { user } = useAuth();
    if (user.dateFormat === "MM/DD/YYYY" || user.dateFormat === null || user.dateFormat === "") {
        return format(new Date(date), 'MMM dd, yyyy');
    }
    return format(new Date(date), 'dd MMM, yyyy');
}

export function fDateTimeVal(date) {
    return format(new Date(date), 'hh:mm a');
}

export function fDateTime(date) {
    return format(new Date(date), 'MMM dd, yyyy hh:mm a');
}

export function fTimestamp(date) {
    return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
    return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fPostDate(date) {
    return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
}

export function fGoogleDateTime(date, time) {
    const nDate = format(new Date(date), "yyyy-MM-dd");
    const nTime = format(new Date(time), 'HH:mm:ss');
    const cDate = `${nDate}T${nTime}`;
    return format(new Date(cDate), "yyyy-MM-dd'T'HH:mm:ss");
}

export function concatTime(time) {
    const date = format(new Date(), "yyyy-MM-dd");
    const nDate = `${date}T${time}`;
    return format(new Date(nDate), "yyyy-MM-dd'T'HH:mm:ss");
}

export function fTime(time) {
    const date = concatTime(time);
    return format(new Date(date), 'hh:mm a');
}

export function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true
    });
}

export function shouldTime() {
    return setMinutes(new Date(), Math.ceil(getMinutes(new Date()) / 15) * 15);
}

export function concatDate(date) {
    const nDate = format(new Date(date), "yyyy-MM-dd");
    const nTime = format(new Date(), 'HH:mm:ss');
    const cDate = `${nDate}T${nTime}`;
    return format(new Date(cDate), "yyyy-MM-dd'T'HH:mm:ss");
}
