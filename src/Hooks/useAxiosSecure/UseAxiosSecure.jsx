import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getIdToken } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

const axiosSecure = axios.create({
  baseURL: `https://real-estate-server-flax.vercel.app`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor to attach token
    axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await getIdToken(auth.currentUser);
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          auth.signOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
