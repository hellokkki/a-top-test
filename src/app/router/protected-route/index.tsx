import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

interface IProtectedRouteProps {
    element: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ element }) => {
  const isAuthentucated = useAuthStore((state) => state.user !== null);

  return isAuthentucated ? element : <Navigate to="/login" />
};