import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../useAuth";
const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  // req interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response intercepter
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const ststus = error.response?.status;
      console.log("inside res interceptor", ststus);
      if (ststus === 403) {
        navigate("/forbidden");
      } else if (ststus === 401) {
        logOut()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
