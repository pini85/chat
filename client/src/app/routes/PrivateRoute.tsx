import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { Paths } from "@/config/paths";

const PrivateRoute = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={Paths.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
