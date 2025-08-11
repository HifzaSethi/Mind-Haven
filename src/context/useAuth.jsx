import { useAppContext } from './AppContext';
export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAppContext();
  return { isAuthenticated, user, login, logout };
};
