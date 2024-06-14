// routes
import Iconify from 'src/components/Iconify';
import { PATH_ADMIN } from '../../../routes/paths';
// components

// icons
const ICONS = {
    dashboard: '',
    category: '',
};

const getIcon = (name) => <Iconify width={16} height={16} icon={name} />;

const navConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: '',
        items: [
            { title: 'dashboard', path: PATH_ADMIN.dashboard, icon: getIcon('mdi:monitor-dashboard') },
            {
                title: 'category',
                path: PATH_ADMIN.category.root,
                icon: getIcon('game-icons:newspaper'),
                children: [
                    { title: 'Categories', path: PATH_ADMIN.category.list },
                    { title: 'Add New', path: PATH_ADMIN.category.new },
                ],
            },
        ],
    },
];

export default navConfig;
