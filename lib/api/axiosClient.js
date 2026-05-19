import axios from "axios";
import getJWTToken from "./getJWTToken";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getJWTToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
