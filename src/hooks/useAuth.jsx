import { useAppContext } from '../context/useAppContext';

const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAppContext();
  return { isAuthenticated, user, login, logout };
};

export default useAuth;
