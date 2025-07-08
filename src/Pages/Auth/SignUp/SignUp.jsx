import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import GoogleSignin from "../SocialLogin/GoogleLogin";
import Divider from "../../../Components/Divider/Divider";
import useAuth from "../../../Hooks/useAuth";
import useRedirect from "../../../Hooks/useRedirect/useRedirect";
import useAxios from "../../../Hooks/useAxios";
import axios from "axios";

const SignUp = () => {
  const { signUp, updateUserProfile } = useAuth();
  const { redirect } = useRedirect();
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await res.json();
      if (imgData.success) {
        setPhotoURL(imgData.data.display_url);
      } else {
        console.error("Image upload failed:", imgData);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    signUp(data.email, data.password)
      .then((res) => {
        // redirect();
      })
      .catch((err) => {
        console.log(err);
      });
    if (!photoURL) {
      alert("Photo is still uploading or missing.");
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      photoURL: photoURL,
      role: "user",
      created_at: new Date().toISOString(),
      last_log_in: new Date().toISOString(),
    };

    // TODO: Send userData to backend
    const userRes = await axiosInstance.post("/users", userData);
    console.log(userRes);
    // await axios.post("http://localhost:3000/users", userData);

    // update user profile in firebase
    const updateProfile = {
      displayName: data.name,
      photoURL: photoURL,
    };

    updateUserProfile(updateProfile)
      .then(() => {
        console.log("image and name updated");
      })

      .catch((err) => {
        console.error(err);
      });

    reset();
    setPhotoURL("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-sm mx-auto p-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-4xl font-semibold text-primary text-center mb-6">
            Register
          </h1>

          {/* Name */}
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input input-bordered w-full"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          {/* Photo */}
          <label className="label mt-4" htmlFor="photo">
            Photo
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageUpload}
          />
          {!photoURL && !uploading && (
            <p className="text-red-500 text-sm mt-1">Photo is required</p>
          )}
          {uploading && (
            <p className="text-sm text-yellow-500 mt-1">Uploading image...</p>
          )}
          {photoURL && (
            <p className="text-sm text-green-500 mt-1">Photo uploaded!</p>
          )}
          {/* Email */}
          <label className="label mt-4" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Your email"
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
            placeholder="Create password"
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

          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={isSubmitting || uploading}
          >
            {isSubmitting ? "Working..." : "Sign up"}
          </button>
        </form>

        <Divider />

        <GoogleSignin />

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link className="link link-primary" to="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
