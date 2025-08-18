// useAxios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://real-estate-server-flax.vercel.app`,
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
