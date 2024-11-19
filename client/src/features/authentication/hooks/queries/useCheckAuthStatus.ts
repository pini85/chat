import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import authService from "@/features/authentication/services/authService";
import { IAuthResponse } from "@shared/types";

const useCheckAuthStatus = () => {
  const token = localStorage.getItem("token");

  const query = useQuery<IAuthResponse, AxiosError>({
    queryKey: ["authStatus"],
    queryFn: async (): Promise<IAuthResponse> => {
      const response = await authService.checkAuthStatus();
      return response;
    },
    enabled: !!token,
  });

  return query;
};

export default useCheckAuthStatus;
