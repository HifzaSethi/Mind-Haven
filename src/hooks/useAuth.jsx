import { useAppContext } from "../Context/AppContext";

const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAppContext();
  return { isAuthenticated, user, login, logout };
};

export default useAuth;