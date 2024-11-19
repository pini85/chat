import LoginForm from "@/features/authentication/components/LoginForm";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { Paths } from "@/config/paths";
export const Login = () => {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to={Paths.HOME} />;
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
};
