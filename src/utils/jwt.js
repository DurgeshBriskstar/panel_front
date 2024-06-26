import { jwtDecode } from 'jwt-decode';
import axios from './axios';

// ----------------------------------------------------------------------

// is valid token
const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }

    // ----------------------------------------------------------------------
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

// handle token expired
const handleTokenExpired = (exp) => {
    let expiredTimer;
    window.clearTimeout(expiredTimer);
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;

    expiredTimer = window.setTimeout(() => {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
        // You can do what ever you want here, like show a notification
    }, timeLeft);
};

// ----------------------------------------------------------------------

// set session
const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const { exp } = jwtDecode(accessToken);
        handleTokenExpired(exp);
    } else {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

export { isValidToken, setSession };
