import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_ADMIN, PATH_AUTH, PATH_BRANCH, PATH_EMPLOYEE } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
    children: PropTypes.node
};

const useCurrentRole = () => {
    // Logic here to get current user role
    const { user } = useAuth();
    const role = user?.role;
    return role;
};

export default function GuestGuard({ children }) {
    const { isAuthenticated } = useAuth();
    const currentRole = useCurrentRole();

    // is authenticated true
    if (isAuthenticated) {
        // current role is admin
        if (currentRole === 'admin') {
            return <Navigate to={PATH_ADMIN.dashboard} />;
        }
        if (currentRole === 'branch') {
            return <Navigate to={PATH_BRANCH.dashboard} />;
        }
        if (currentRole === 'employee') {
            return <Navigate to={PATH_EMPLOYEE.dashboard} />;
        }
        return <Navigate to={PATH_AUTH} />;
    }

    return <>{children}</>;
}
