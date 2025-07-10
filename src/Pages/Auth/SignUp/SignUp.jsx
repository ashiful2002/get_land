import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Swal from "sweetalert2";
import GoogleSignin from "../SocialLogin/GoogleLogin";
import Divider from "../../../Components/Divider/Divider";
import useAuth from "../../../Hooks/useAuth";
import useRedirect from "../../../Hooks/useRedirect/useRedirect";
import useAxios from "../../../Hooks/useAxios";

const SignUp = () => {
  const { signUp, updateUserProfile } = useAuth();
  const { redirect } = useRedirect();
  const { axiosInstance } = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);

  // Handle Image Upload to imgbb
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
console.log(imgData);

      if (imgData.success) {
        setPhotoURL(imgData.data.display_url);
        Swal.fire("Image uploaded successfully", "", "success");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Image upload failed", "", "error");
    } finally {
      setUploading(false);
    }
  };

  // Submit Registration Form
  const onSubmit = async (data) => {
    if (!photoURL) {
      Swal.fire("Please upload your profile picture first", "", "warning");
      return;
    }

    try {
      // Firebase Signup
      const result = await signUp(data.email, data.password);
      const user = result.user;

      // Update Firebase Profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // Save User to Backend
      const userData = {
        name: data.name,
        email: data.email,
        photoURL,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userData);

      Swal.fire("Account created successfully", "", "success");
      reset();
      setPhotoURL("");
      redirect();
    } catch (err) {
      console.error("Signup Error:", err);
      Swal.fire("Sign up failed", err.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-base-200 border border-base-300 rounded-box w-full max-w-sm p-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            Create Your Account
          </h1>

          {/* Name */}
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="input input-bordered w-full"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          {/* Photo Upload */}
          <label className="label mt-4" htmlFor="photo">Profile Photo</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageUpload}
          />
          {uploading && <p className="text-yellow-500 text-sm mt-1">Uploading image...</p>}
          {!photoURL && !uploading && <p className="text-red-500 text-sm">Photo is required</p>}
          {photoURL && (
            <img
              src={photoURL}
              alt="Uploaded preview"
              className="w-16 h-16 rounded-full mt-2 object-cover border"
            />
          )}

          {/* Email */}
          <label className="label mt-4" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <label className="label mt-4" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={isSubmitting || uploading}
          >
            {isSubmitting || uploading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <Divider />

        <GoogleSignin />

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/sign-in" className="link link-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
