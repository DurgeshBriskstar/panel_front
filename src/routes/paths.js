// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/';
const ROOTS_ADMIN = '/admin';
const ROOTS_BRANCH = '/branch';
const ROOTS_EMPLOYEE = '/employee';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, 'login'),
    register: path(ROOTS_AUTH, 'signup'),
    thankYou: (name) => path(ROOTS_BRANCH, `/thank-you/${name}`),
    resetPassword: path(ROOTS_AUTH, 'reset-password'),
};

export const PATH_PAGE = {
    page404: '/404',
    page500: '/500',
    comingSoon: '/coming-soon',
};

export const PATH_ADMIN = {
    root: ROOTS_ADMIN,
    dashboard: path(ROOTS_ADMIN, '/dashboard'),
    setting: {
        root: path(ROOTS_ADMIN, '/setting'),
        account: path(ROOTS_ADMIN, '/setting/update/account-setting'),
        settingView: (tabKey) => path(ROOTS_ADMIN, `/setting/update/${tabKey}`),
    },
    user: {
        root: path(ROOTS_ADMIN, '/users'),
        list: path(ROOTS_ADMIN, '/users/list'),
        new: path(ROOTS_ADMIN, '/users/add'),
        userEdit: (id) => path(ROOTS_ADMIN, `/users/edit/${id}`),
    },
    blog: {
        root: path(ROOTS_ADMIN, '/blogs'),
        list: path(ROOTS_ADMIN, '/blogs/list'),
        new: path(ROOTS_ADMIN, '/blogs/add'),
        blogEdit: (id) => path(ROOTS_ADMIN, `/blogs/edit/${id}`),
    },
    category: {
        root: path(ROOTS_ADMIN, '/categories'),
        list: path(ROOTS_ADMIN, '/categories/list'),
        new: path(ROOTS_ADMIN, '/categories/add'),
        categoryEdit: (id) => path(ROOTS_ADMIN, `/categories/edit/${id}`),
    },
    slider: {
        root: path(ROOTS_ADMIN, '/sliders'),
        list: path(ROOTS_ADMIN, '/sliders/list'),
        new: path(ROOTS_ADMIN, '/sliders/add'),
        sliderEdit: (id) => path(ROOTS_ADMIN, `/sliders/edit/${id}`),
    },
    graphic: {
        root: path(ROOTS_ADMIN, '/graphics'),
        list: path(ROOTS_ADMIN, '/graphics/list'),
        card: path(ROOTS_ADMIN, '/graphics/card'),
        new: path(ROOTS_ADMIN, '/graphics/add'),
        graphicEdit: (id) => path(ROOTS_ADMIN, `/graphics/edit/${id}`),
    },
};

export const PATH_BRANCH = {
    root: ROOTS_BRANCH,
    dashboard: path(ROOTS_BRANCH, '/dashboard'),
    category: {
        root: path(ROOTS_BRANCH, '/categories'),
        list: path(ROOTS_BRANCH, '/categories/list'),
        new: path(ROOTS_BRANCH, '/categories/add'),
        categoryEdit: (id) => path(ROOTS_BRANCH, `/categories/edit/${id}`),
    }
};

export const PATH_EMPLOYEE = {
    root: ROOTS_EMPLOYEE,
    dashboard: path(ROOTS_EMPLOYEE, '/dashboard'),
    category: {
        root: path(ROOTS_EMPLOYEE, '/categories'),
        list: path(ROOTS_EMPLOYEE, '/categories/list'),
        new: path(ROOTS_EMPLOYEE, '/categories/add'),
        categoryEdit: (id) => path(ROOTS_EMPLOYEE, `/categories/edit/${id}`),
    }
};
