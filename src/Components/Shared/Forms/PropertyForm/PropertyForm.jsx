import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import axios from "axios";

const PropertyForm = () => {
  const { axiosInstance } = useAxios();
  const [imagePreview, setPreview] = useState(null);

  const { user } = useAuth();
  console.log(user);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const watchImage = watch("image");
  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      return () => URL.revokeObjectURL(previewURL);
    }
  }, [watchImage]);

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (!data.image[0]) {
        Swal.fire("Missing Image", "Please upload an image.", "warning");
        return;
      }

      setUploading(true);

      // Upload image to imgbb
      const imageFile = data.image[0];
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;
      // const uploadRes = await fetch(
      //   `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      //   {
      //     method: "POST",
      //     body: imageFormData,
      //   }
      // );

      const { imageData } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        imageFormData
      );
      const imgData = await imageData.json();

      if (!imgData.success) {
        throw new Error("Image upload failed.");
      }

      const imageURL = imgData.data.display_url;
      const priceRange = `$${data.minPrice} - $${data.maxPrice}`;

      const property = {
        title: data.title,
        location: data.location,
        image: imageURL,
        agent_name: user.displayName,
        agent_email: user.email,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        priceRange,
        created_at: new Date().toISOString(),
      };

      const res = await axiosInstance.post("/properties", property);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Property has been added.", "success");
        reset();
      }
    } catch (error) {
      console.error("Error adding property:", error);
      Swal.fire("Error", "Failed to add property.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-screen-lg mx-auto p-6 space-y-6 bg-base-200 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-primary">
        Add New Property
      </h2>
      {imagePreview && (
        <figure>
          <img
            src={imagePreview}
            alt="preview"
            className="mt-3 w-[500px] mx-auto object-cover rounded-md shadow"
          />
        </figure>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Name */}
        <div>
          <label className="label">Agent Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label className="label">Agent Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
          />
        </div>
        {/* Property Title */}
        <div>
          <label className="label" htmlFor="title">
            Property Title
          </label>
          <input
            id="title"
            type="text"
            className="input input-bordered w-full"
            placeholder="Luxury Apartment"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Property Location */}
        <div>
          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            className="input input-bordered w-full"
            placeholder="Dhaka, Bangladesh"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label" htmlFor="image">
            Image
          </label>
          <input
            id="image"
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {uploading && (
            <p className="text-yellow-500 mt-1">Uploading image...</p>
          )}
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="minPrice">
              Min Price
            </label>
            <input
              id="minPrice"
              type="number"
              placeholder="1500"
              className="input input-bordered w-full"
              {...register("minPrice", { required: "Min price is required" })}
            />
            {errors.minPrice && (
              <p className="text-red-500 text-sm">{errors.minPrice.message}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="maxPrice">
              Max Price
            </label>
            <input
              id="maxPrice"
              type="number"
              placeholder="2000"
              className="input input-bordered w-full"
              {...register("maxPrice", { required: "Max price is required" })}
            />
            {errors.maxPrice && (
              <p className="text-red-500 text-sm">{errors.maxPrice.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting || uploading}
      >
        {isSubmitting ? "Submitting..." : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
