import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import useAuth from "../../../Hooks/useAuth";
import useRedirect from "../../../Hooks/useRedirect/useRedirect";
import useAxios from "../../../Hooks/useAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/UseAxiosSecure";

const GoogleSignin = () => {
  const { GoogleSignin, setUser } = useAuth();
  const { redirect } = useRedirect();
  const axiosSecure = useAxiosSecure();
  const handleGoogleLogin = () => {
    GoogleSignin()
      .then(async (res) => {
        const user = res.user;
        // console.log(user);

        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // TODO: Send userData to backend
        const userRes = await axiosSecure.post("/users", userData);
        // console.log(userRes);
        redirect();
        // console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="btn bg-white text-black border-[#e5e5e5] w-full hover:shadow-md"
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="mr-2"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff" />
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          />
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          />
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          />
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          />
        </g>
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleSignin;
