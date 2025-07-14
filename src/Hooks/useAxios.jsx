// useAxios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
});

// Set interceptor once globally
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
