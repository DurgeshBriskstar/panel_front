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
// CATEGORY
const ADCategory = Loadable(lazy(() => import('../pages/admin/Category/CategoryList')));
const ADCategoryForm = Loadable(lazy(() => import('../pages/admin/Category/CategoryAddEdit')));


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
