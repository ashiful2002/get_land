import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: `https://real-estate-server-j1vphwnm6-ashiful2002s-projects.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
