import axios from "axios";
import getJWTToken from "./getJWTToken";

const token = getJWTToken();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/v1",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token}` },
  withCredentials: true,
});

export default api;
