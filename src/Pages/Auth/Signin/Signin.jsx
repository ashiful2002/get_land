import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Divider from "../../../Components/Divider/Divider";
import GoogleSignin from "../SocialLogin/GoogleLogin";
import useAuth from "../../../Hooks/useAuth";
import useRedirect from "../../../Hooks/useRedirect/useRedirect";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/UseAxiosSecure";

const LoginForm = () => {
  const { signin } = useAuth();
  const { redirect } = useRedirect();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signin(data.email, data.password)
      .then(async (res) => {
        const user = res.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "user",
        };

        // TODO: Send userData to backend
        const userRes = await axiosSecure.post("/users", userData);
        console.log(userRes);
        redirect();
      })
      .catch((err) => {
        Swal.fire(
          "Email and Password does not found",
          `${err.message}`,
          `error`
        );
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-sm mx-auto p-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-semibold text-primary text-center mb-6">
            Login
          </h1>

          {/* Email */}
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="label mt-4" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <button type="submit" className="btn btn-primary w-full mt-6">
            Login
          </button>
        </form>

        <Divider />

        <GoogleSignin />

        <p className="text-center mt-4">
          New user?{" "}
          <Link className="link link-primary" to="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
