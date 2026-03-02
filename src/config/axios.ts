import { STORAGE_NAME } from "@/constants/auht.constant";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    console.log({ status });

    if (status === 401) {
      localStorage.removeItem(STORAGE_NAME);

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default http;
