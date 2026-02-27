import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN } from "../constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? apiUrl,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (
    token &&
    !config.url?.includes("/login") &&
    !config.url?.includes("/register")
  ) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        { refresh }
      );

      const newAccess = response.data.access;
      localStorage.setItem("access", newAccess);

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
