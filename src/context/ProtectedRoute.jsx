import { Navigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
