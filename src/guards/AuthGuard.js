import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// route
import { PATH_AUTH } from '../routes/paths';
// pages
import Login from '../pages/auth/Login';
import LoadingScreen from 'src/components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default function AuthGuard({ children }) {
    const { isAuthenticated, isInitialized } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    // is not initialized false
    if (!isInitialized) {
        return <LoadingScreen />;
    }

    // is not authenticated false
    if (!isAuthenticated) {
        if (!localStorage.getItem('accessToken')) {
            return <Navigate to={PATH_AUTH.root} />;
        }
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    // is requested location true & pathname is not equal to requested location
    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }
    return <>{children}</>;
}
