import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user } = useAuth();
  const role = user?.role;
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, path, children }) {
  const currentRole = useCurrentRole();

  let content = null;
  if (!accessibleRoles.includes(currentRole)) {
    content = (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }
  else {
    content = children;
  }

  return <>{content}</>;
}
