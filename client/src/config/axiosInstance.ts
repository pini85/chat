import axios, { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

const api = axios.create();

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      // Add the Authorization header if a token is available
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
