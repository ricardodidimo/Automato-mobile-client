import axios from "axios";
import { useAuthStore } from "../stores/AuthStore";

const api = axios.create({
  baseURL: "https://vaultapp-brazil-south12939.azurewebsites.net",
  validateStatus: () => true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
