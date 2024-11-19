const API_URL = "/api/messages";
import api from "@/config/axiosInstance";
export const fetchMessagesByRoom = async (roomId: string): Promise<any[]> => {
  const response = await api.get(`${API_URL}/${roomId}`);

  return response.data;
};
