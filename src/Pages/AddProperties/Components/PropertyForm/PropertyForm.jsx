import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../../Hooks/useAxios";
import Swal from "sweetalert2";

const PropertyForm = () => {
  const { axiosInstance } = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.isVerified = data.isVerified === "true";
      data.priceRange = `$${data.minPrice} - $${data.maxPrice}`;
      delete data.minPrice;
      delete data.maxPrice;

      const res = await axiosInstance.post("/properties", data);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Property Added",
          text: "Your property has been successfully submitted!",
        });
        reset();
      }
    } catch (error) {
      console.error("Failed to post property:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-screen-lg mx-auto p-6 space-y-6 bg-base-200 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Add New Property</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side Inputs */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Property title"
              className="input input-bordered w-full"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="label" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Agent Name */}
          <div>
            <label className="label" htmlFor="agent_name">
              Agent Name
            </label>
            <input
              id="agent_name"
              type="text"
              placeholder="Agent Name"
              className="input input-bordered w-full"
              {...register("agent_name", {
                required: "Agent name is required",
              })}
            />
            {errors.agent_name && (
              <p className="text-red-500 text-sm">
                {errors.agent_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Right Side Inputs */}
        <div className="space-y-4">
          {/* Location */}
          <div>
            <label className="label" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Property location"
              className="input input-bordered w-full"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Completed Year */}
          <div>
            <label className="label" htmlFor="completed_year">
              Completed Year
            </label>
            <input
              id="completed_year"
              type="number"
              placeholder="2023"
              className="input input-bordered w-full"
              {...register("completed_year", {
                required: "Completed year is required",
              })}
            />
            {errors.completed_year && (
              <p className="text-red-500 text-sm">
                {errors.completed_year.message}
              </p>
            )}
          </div>

          {/* Verified */}
          <div>
            <label className="label">Verified</label>
            <select
              className="select select-bordered w-full"
              {...register("isVerified", {
                required: "Verification status required",
              })}
            >
              <option value="true">Verified</option>
              <option value="false">Not Verified</option>
            </select>
            {errors.isVerified && (
              <p className="text-red-500 text-sm">
                {errors.isVerified.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Price and Description - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div>
        <label className="label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
