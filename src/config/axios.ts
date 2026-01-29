import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// http.interceptors.response.use((response) => {
//   return response.data;
// });

export default http;
