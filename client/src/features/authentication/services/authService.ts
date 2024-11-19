import api from "@/config/axiosInstance";
import { IAuthResponse } from "@shared/types";

const API_URL = "/api/auth";
const login = async (
  username: string,
  password: string
): Promise<IAuthResponse> => {
  const response = await api.post(`${API_URL}/login`, { username, password });
  return response.data;
};

const logout = async (): Promise<void> => {
  const response = await api.post(`${API_URL}/logout`);
  return response.data;
};

const checkAuthStatus = async (): Promise<IAuthResponse> => {
  const response = await api.get(`${API_URL}/me`);
  return response.data;
};

const authServiceRoutes = {
  login,
  logout,
  checkAuthStatus,
};

export default authServiceRoutes;
