import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const UpdateProfile = ({ showModal, setShowModal, userProfile }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      facebookUrl: userProfile?.facebookUrl || "",
      instagramUrl: userProfile?.instagramUrl || "",
      linkedinUrl: userProfile?.linkedinUrl || "",
      twitterUrl: userProfile?.twitterUrl || "",
    },
  });

  // Mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosSecure.put(
        `/users/${userProfile?.email}`,
        updateData
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Profile updated successfully", "success");
      queryClient.invalidateQueries(["profile"]);
      setShowModal(false);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update profile", "error");
    },
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-base-300 dark:bg-base-100 p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  readOnly
                  className="input input-bordered w-full cursor-not-allowed"
                  {...register("email")}
                />
              </div>
              {/* facebook */}
              {userProfile && (
                <div className="mb-4">
                  <label className="block mb-1">
                    <FaFacebook className="inline mr-2" />
                    Facebook
                  </label>
                  <input
                    className="input input-bordered w-full"
                    {...register("facebookUrl")}
                  />
                </div>
              )}
              {userProfile && (
                <div className="mb-4">
                  <label className="block mb-1">
                    <FaInstagram className="inline mr-2" />
                    Instagram
                  </label>
                  <input
                    className="input input-bordered w-full"
                    {...register("instagramUrl")}
                  />
                </div>
              )}
              {userProfile && (
                <div className="mb-4">
                  <label className="block mb-1">
                    <FaLinkedin className="inline mr-2" />
                    Linked in
                  </label>
                  <input
                    className="input input-bordered w-full"
                    {...register("linkedinUrl")}
                  />
                </div>
              )}
              {userProfile && (
                <div className="mb-4">
                  <label className="block mb-1">
                    <FaXTwitter className="inline mr-2" />
                    twitter / x
                  </label>
                  <input
                    className="input input-bordered w-full"
                    {...register("twitterUrl")}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-success w-full mt-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
