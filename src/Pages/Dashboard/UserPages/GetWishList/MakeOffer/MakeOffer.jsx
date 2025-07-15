import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../Hooks/useAuth";
import Loading from "../../../../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure/UseAxiosSecure";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const offerAmount = parseFloat(data.offerAmount);
    const min = parseFloat(property?.minPrice);
    const max = parseFloat(property?.maxPrice);

    if (offerAmount < min || offerAmount > max) {
      const message = `Offer must be between $${min} and $${max}`;
      setValidOffer(message);
      await Swal.fire("Invalid Amount", message, "warning");
      return;
    }

    const offeredDetails = {
      ...property,
      propertyId: id,
      offerAmount,
      buyerEmail: user.email,
      buyerName: user.displayName,
      offered_date: new Date().toISOString(),
      status: "pending",
    };
    delete offeredDetails._id;
    try {
      const res = await axiosSecure.post("/make-offer", offeredDetails);
      if (res.data.insertedId) {
        Swal.fire("Success", "Offer submitted successfully!", "success");
        navigate("/dashboard/property-bought");
      }
    } catch (error) {
      console.error("Offer Error:", error);
      Swal.fire("Error", "Failed to submit offer", "error");
    }
  };

  // console.log(property);

  if (isLoading) {
    return <Loading />;
  }
  if (!property) {
    return <p className="text-red-600 text-center ">Failed to load property</p>;
  }
  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Property Name */}
        <label htmlFor="">Property Name:</label>
        <input
          type="text"
          value={property.title}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Location */}
        <label htmlFor="">Location:</label>
        <input
          type="text"
          value={property.location}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Agent Name */}
        <label htmlFor="">Agent Name:</label>
        <input
          type="text"
          value={property.agent_name}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Offer Amount */}
        <label htmlFor="">Offer Amount:</label>
        <input
          type="number"
          min={parseFloat(property.minPrice)}
          max={parseFloat(property.maxPrice)}
          step="20"
          // defaultValue={property.minPrice}
          placeholder={`Enter amount ($${property.minPrice} - $${property.maxPrice})`}
          {...register("offerAmount", {
            required: "Offer amount is required",
            validate: (value) => {
              const val = parseFloat(value);
              if (val < property.minPrice || val > property.maxPrice) {
                return `Offer must be between $${property.minPrice} and $${property.maxPrice}`;
              }
              return true;
            },
          })}
          className="input input-bordered w-full"
        />

        {errors.offerAmount && (
          <p className="text-red-500 text-sm">{errors.offerAmount.message}</p>
        )}

        {/* User Email */}
        <label htmlFor="">User Email:</label>
        <input
          type="text"
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />

        {/* User Name */}
        <label htmlFor="">User Name:</label>
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
