import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../../../Hooks/useAuth";
import Loading from "../../../../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { HiLocationMarker } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
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
      propertyId: id,
      image: property.image,
      title: property.title,
      location: property.location,
      agent_name: property.agent_name,
      agent_email: property.agent_email,
      userImage: property.userImage,
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


  if (isLoading) {
    return <Loading />;
  }
  if (!property) {
    return <p className="text-red-600 text-center ">Failed to load property</p>;
  }
  return (
    <div className="max-w-5xl mx-auto bg-base-200 p-6 md:p-10 rounded-xl shadow mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Make an Offer
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Property Image */}
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-72 md:h-96 object-cover rounded-lg"
        />

        {/* Property Title and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="label">
              <span className="label-text">Property Name</span>
            </label>
            <input
              id="title"
              type="text"
              value={property.title}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="location" className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              id="location"
              type="text"
              value={property.location}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="divider"></div>

        {/* Agent & User Info Side-by-Side */}

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Agent Info */}
          <div className="flex-1 space-y-4 shadow-xl rounded-xl p-2 py-10 border border-gray-300">
            <h2 className="text-xl ">Agent Information</h2>
            <div className="">
              <img
                src={property.userImage}
                alt="Agent"
                className="mx-auto w-16 h-16 object-cover rounded-full border"
              />
            </div>
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              type="text"
              value={property.agent_name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          {/* User Info */}

          <div className="flex-1 space-y-4 shadow-xl rounded-xl p-2 py-10 border border-gray-300">
            <h2 className="text-xl">Buyer Information</h2>
            <div className="">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-16 h-16 mx-auto object-cover rounded-full border"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div>{}</div>
          </div>
        </div>
        <div className="divider"></div>
        {/* Offer Amount */}
        <div>
          <label htmlFor="offerAmount" className="label">
            <span className="label-text">Offer Amount ($)</span>
          </label>
          <input
            id="offerAmount"
            type="number"
            min={parseFloat(property.minPrice)}
            max={parseFloat(property.maxPrice)}
            step="20"
            placeholder={`Enter amount between $${property.minPrice} - $${property.maxPrice}`}
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
            <p className="text-red-500 text-sm mt-1">
              {errors.offerAmount.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
