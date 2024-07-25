import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import AdminLayout from '../layouts/admin';
import BranchLayout from '../layouts/branch';
import EmployeeLayout from '../layouts/employee';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import RoleBasedGuard from '../guards/RoleBasedGuard';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN_ADMIN, PATH_AFTER_LOGIN_BRANCH, PATH_AFTER_LOGIN_EMPLOYEE } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_ADMIN } from './paths';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function MainRouter() {
    return useRoutes([
        {
            path: '/',
            children: [
                {
                    path: '/',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'signup',
                    element: (
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    ),
                },
                { path: 'thank-you/:name', element: <ThankYou /> },
                { path: 'reset-password', element: <ResetPassword /> },
            ],
        },

        // Admin Routes
        {
            path: 'admin',
            element: (
                <AuthGuard>
                    <AdminLayout />
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={PATH_AFTER_LOGIN_ADMIN} replace />, index: true },
                {
                    path: 'dashboard',
                    element: <AdminDashboard />
                },
                {
                    path: 'setting',
                    children: [
                        { element: <Navigate to="/admin/setting/update/account-setting" replace />, index: true },
                        {
                            path: 'update',
                            element: <AdminSetting />
                        },
                        {
                            path: 'update/:tabKey',
                            element: <AdminSetting />
                        },
                    ],
                },
                {
                    path: 'users',
                    children: [
                        {
                            element: <Navigate to="/admin/users/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADUser />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADUserForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADUserForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                },
                {
                    path: 'categories',
                    children: [
                        {
                            element: <Navigate to="/admin/categories/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADCategory />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADCategoryForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADCategoryForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                },
                {
                    path: 'sliders',
                    children: [
                        {
                            element: <Navigate to="/admin/sliders/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADSlider />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADSliderForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADSliderForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                },
                {
                    path: 'blogs',
                    children: [
                        {
                            element: <Navigate to="/admin/blogs/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADBlog />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADBlogForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADBlogForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                },
                {
                    path: 'graphics',
                    children: [
                        {
                            element: <Navigate to="/admin/graphics/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADGraphic />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'card',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADGraphic />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADGraphicForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADGraphicForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                },
                {
                    path: 'tools',
                    children: [
                        {
                            element: <Navigate to="/admin/tools/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin']}>
                                    <ADTool />
                                </RoleBasedGuard>
                            ),
                        }
                    ],
                },
            ],
        },

        // Branch Routes
        {
            path: 'branch',
            element: (
                <AuthGuard>
                    <BranchLayout />
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={PATH_AFTER_LOGIN_BRANCH} replace />, index: true },
                {
                    path: 'dashboard',
                    element: <BranchDashboard />
                },
                // {
                //     path: 'setting',
                //     children: [
                //         { element: <Navigate to="/branch/setting/account" replace />, index: true },
                //         { path: 'account', element: <UserAccount /> },
                //         {
                //             path: 'app',
                //             element: (
                //                 <RoleBasedGuard accessibleRoles={['operator']}>
                //                     <UserSetting />
                //                 </RoleBasedGuard>
                //             )
                //         },
                //         {
                //             path: 'app/:tabKey',
                //             element: (
                //                 <RoleBasedGuard accessibleRoles={['operator']}>
                //                     <UserSetting />
                //                 </RoleBasedGuard>
                //             )
                //         },
                //     ],
                // },
                {
                    path: 'categories',
                    children: [
                        {
                            element: <Navigate to="/branch/categories/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin', 'branch']}>
                                    <BRCategory />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin', 'branch']}>
                                    <BRCategoryForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin', 'branch']}>
                                    <BRCategoryForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                },
            ],
        },

        // Employee Routes
        {
            path: 'employee',
            element: (
                <AuthGuard>
                    <EmployeeLayout />
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={PATH_AFTER_LOGIN_EMPLOYEE} replace />, index: true },
                {
                    path: 'dashboard',
                    element: <EmployeeDashboard />
                },
                {
                    path: 'categories',
                    children: [
                        {
                            element: <Navigate to="/employee/categories/list" replace />,
                            index: true
                        },
                        {
                            path: 'list',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin', 'employee']}>
                                    <EMCategory />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'add',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin', 'employee']}>
                                    <EMCategoryForm />
                                </RoleBasedGuard>
                            ),
                        },
                        {
                            path: 'edit/:id',
                            element: (
                                <RoleBasedGuard accessibleRoles={['admin', 'employee']}>
                                    <EMCategoryForm />
                                </RoleBasedGuard>
                            ),
                        },
                    ],
                }
            ],
        },

        // Main Routes
        {
            path: '*',
            element: <LogoOnlyLayout />,
            children: [
                { path: '500', element: <Page500 /> },
                { path: '404', element: <NotFound /> },
                { path: 'coming-soon', element: <ComingSoon /> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}

/* ======================================== AUTHENTICATION ======================================== */
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/SignUp')));
const ThankYou = Loadable(lazy(() => import('../pages/auth/ThankYou')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));

/* ======================================== Admin ======================================== */
// DASHBOARD
const AdminDashboard = Loadable(lazy(() => import('../pages/admin/Dashboard')));
// ACCOUNT
const AdminSetting = Loadable(lazy(() => import('../pages/admin/setting/Setting')));

// USER
const ADUser = Loadable(lazy(() => import('../pages/admin/User/UserList')));
const ADUserForm = Loadable(lazy(() => import('../pages/admin/User/UserAddEdit')));


// CATEGORY
const ADCategory = Loadable(lazy(() => import('../pages/admin/Category/CategoryList')));
const ADCategoryForm = Loadable(lazy(() => import('../pages/admin/Category/CategoryAddEdit')));

// SLIDER
const ADSlider = Loadable(lazy(() => import('../pages/admin/Slider/SliderList')));
const ADSliderForm = Loadable(lazy(() => import('../pages/admin/Slider/SliderAddEdit')));

// GRAPHIC
const ADGraphic = Loadable(lazy(() => import('../pages/admin/Graphic/GraphicList')));
const ADGraphicForm = Loadable(lazy(() => import('../pages/admin/Graphic/GraphicAddEdit')));

// TOOLS
const ADTool = Loadable(lazy(() => import('../pages/admin/Tool/ToolList')));

// BLOG & NEWS
const ADBlog = Loadable(lazy(() => import('../pages/admin/Blog/BlogList')));
const ADBlogForm = Loadable(lazy(() => import('../pages/admin/Blog/BlogAddEdit')));


/* ======================================== Branch ======================================== */
// DASHBOARD
const BranchDashboard = Loadable(lazy(() => import('../pages/branch/Dashboard')));
// CATEGORY
const BRCategory = Loadable(lazy(() => import('../pages/branch/Category/CategoryList')));
const BRCategoryForm = Loadable(lazy(() => import('../pages/branch/Category/CategoryAddEdit')));

/* ======================================== Employee ======================================== */
const EmployeeDashboard = Loadable(lazy(() => import('../pages/employee/Dashboard')));
// CATEGORY
const EMCategory = Loadable(lazy(() => import('../pages/employee/Category/CategoryList')));
const EMCategoryForm = Loadable(lazy(() => import('../pages/employee/Category/CategoryAddEdit')));

// MAIN
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
