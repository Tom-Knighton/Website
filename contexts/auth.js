import Login from "../pages/auth/login";
import { useAuth } from "./AuthProvider";
export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (typeof window !== "undefined") {
    if (
      isLoading ||
      (!isAuthenticated && window.location.pathname !== "/auth/login")
    ) {
      return <div />;
    }
  }

  return children;
};
