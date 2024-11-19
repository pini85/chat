import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authServiceRoutes from "../../services/authService";
import { IAuthResponse } from "@shared/types";
import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import { MutationConfig } from "@/lib/react-query";

type LoginCredentials = {
  username: string;
  password: string;
};

const loginMutationFn = async ({
  username,
  password,
}: LoginCredentials): Promise<IAuthResponse> => {
  return await authServiceRoutes.login(username, password);
};

export const useLogin = (config?: MutationConfig<typeof loginMutationFn>) => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  return useMutation<IAuthResponse, Error, LoginCredentials>({
    mutationFn: loginMutationFn,
    onSuccess: (data, variables, context) => {
      login(data);

      // Navigate to chat on success
      navigate("/chat");

      if (config?.onSuccess) {
        config.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (config?.onError) {
        config.onError(error, variables, context);
      }
    },
  });
};
