import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Get from .env
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
