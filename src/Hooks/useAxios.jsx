import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const useAxios = () => {
  const { user } = useAuth();
  const token = user?.accessToken;

  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`,
  });

  // add intercepter here to attach token
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  });

  return { axiosInstance };
};

export default useAxios;
