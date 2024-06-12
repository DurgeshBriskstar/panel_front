import { PATH_ADMIN, PATH_BRANCH, PATH_EMPLOYEE } from "./routes/paths";

export const REACT_URL = process.env.REACT_APP_URL;

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const HEADER = {
    MOBILE_HEIGHT: 64,
    MAIN_DESKTOP_HEIGHT: 88,
    DASHBOARD_DESKTOP_HEIGHT: 92,
    DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
    BASE_WIDTH: 260,
    DASHBOARD_WIDTH: 280,
    DASHBOARD_COLLAPSE_WIDTH: 88,
    //
    DASHBOARD_ITEM_ROOT_HEIGHT: 48,
    DASHBOARD_ITEM_SUB_HEIGHT: 40,
    DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
    NAVBAR_ITEM: 22,
    NAVBAR_ITEM_HORIZONTAL: 20,
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN_ADMIN = PATH_ADMIN.dashboard;
export const PATH_AFTER_LOGIN_BRANCH = PATH_BRANCH.dashboard;
export const PATH_AFTER_LOGIN_EMPLOYEE = PATH_EMPLOYEE.dashboard;


// SETTINGS
// Please remove `localStorage` when you set settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
    themeMode: 'light',
    themeDirection: 'ltr',
    themeColorPresets: 'default',
    themeLayout: 'horizontal',
    themeStretch: false,
};