import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import { imageUpload } from "../../../../api/util"; // Make sure this works

const PropertyForm = () => {
  const { user } = useAuth();
  const { axiosInstance } = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const watchImage = watch("image");

  // Preview image on file change
  useEffect(() => {
    if (watchImage && watchImage[0]) {
      const file = watchImage[0];
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);

      return () => URL.revokeObjectURL(previewURL);
    }
  }, [watchImage]);

  const onSubmit = async (formData) => {
    try {
      // Check for image
      if (!formData.image || !formData.image[0]) {
        return Swal.fire("Missing Image", "Please upload an image.", "warning");
      }

      setUploading(true);

      // Upload image to imgbb
      const uploadedImageURL = await imageUpload(formData.image[0]);
      if (!uploadedImageURL) {
        throw new Error("Image upload failed");
      }

      const priceRange = `$${formData.minPrice} - $${formData.maxPrice}`;

      const property = {
        agent_name: user?.displayName,
        agent_email: user?.email,
        userImage: user?.photoURL || "",
        title: formData.title,
        location: formData.location,
        minPrice: formData.minPrice,
        maxPrice: formData.maxPrice,
        description: formData.description,
        image: uploadedImageURL,
        priceRange: `${formData.minPrice} - ${formData.maxPrice}`,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const response = await axiosInstance.post("/properties", property);

      if (response.data.insertedId) {
        Swal.fire("Success!", "Property added successfully!", "success");
        reset();
        setImagePreview(null);
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
      <h2 className="text-3xl font-bold text-center text-primary mb-4">
        Add Property
      </h2>

      {/* Preview Image */}
      {imagePreview && (
        <div className="flex justify-center">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-[500px] h-auto object-cover rounded shadow"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Info */}
        <div>
          <label className="label">Agent Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="label">Agent Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-base-100 cursor-not-allowed"
          />
        </div>

        {/* Title */}
        <div>
          <label className="label">Property Title</label>
          <input
            type="text"
            placeholder="Modern Apartment"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            placeholder="City, Country"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Min Price</label>
            <input
              type="number"
              {...register("minPrice", { required: "Min price is required" })}
              className="input input-bordered w-full"
              placeholder="1000"
            />
            {errors.minPrice && (
              <p className="text-red-500">{errors.minPrice.message}</p>
            )}
          </div>
          <div>
            <label className="label">Max Price</label>
            <input
              type="number"
              {...register("maxPrice", { required: "Max price is required" })}
              className="input input-bordered w-full"
              placeholder="3000"
            />
            {errors.maxPrice && (
              <p className="text-red-500">{errors.maxPrice.message}</p>
            )}
          </div>
        </div>
        {/* Description */}
        <div className="">
          <label className="label">Description</label>
          <textarea
            rows="4"
            placeholder="Write about the property's features, amenities, etc."
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting || uploading}
      >
        {isSubmitting || uploading ? "Submitting..." : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
