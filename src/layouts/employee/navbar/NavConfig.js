// routes
import { PATH_ADMIN } from '../../../routes/paths';
// components

// icons
const ICONS = {
    dashboard: '',
    category: '',
};

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: '',
        items: [
            { title: 'dashboard', path: PATH_ADMIN.dashboard, icon: ICONS.dashboard },
            { title: 'category', path: PATH_ADMIN.category.root, icon: ICONS.category },
        ],
    },
];

export default navConfig;
