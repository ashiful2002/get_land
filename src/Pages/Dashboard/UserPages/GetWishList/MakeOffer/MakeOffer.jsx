import React, { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import useAuth from "../../../../../Hooks/useAuth";
import Loading from "../../../../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <p className="text-red-500 text-center mt-8">Failed to load property</p>
    );
  }

  const onSubmit = async (data) => {
    const offerAmount = parseFloat(data.offerAmount);
    const min = parseFloat(data.minPrice);
    const max = parseFloat(data.maxPrice);

    if (offerAmount < min || offerAmount > max) {
      return Swal.fire(
        "Invaliud amount",
        `offer must be between ${min} and ${max}`
      );
    }
    const offer = {
      propertyId: id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      agentName: property.agent_name,
      offerAmount,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: data.buyingDate,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/offer", offer);
      if (res.data.insertedId) {
        Swal.fire("Success", "Offer submitted successfully!", "success");
        navigate("/dashboard/property-bought");
      }
    } catch (error) {
      console.error("Offer Error:", error);
      Swal.fire("Error", "Failed to submit offer", "error");
    }
  };

  // useEffect(() => {
  //   axiosSecure.get(`/wishlist/${id}`).then((res) => setProperty(res.data));
  // }, [id, axiosSecure]);
  // console.log(property);

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label htmlFor="">property name:</label>{" "}
        <input
          type="text"
          value={property.title}
          readOnly
          className="input input-bordered w-full"
        />
        <label htmlFor="">Loacation:</label>
        <input
          type="text"
          value={property.location}
          readOnly
          className="input input-bordered w-full"
        />
        <label htmlFor="">agent name</label>
        <input
          type="text"
          value={property.agent_name}
          readOnly
          className="input input-bordered w-full"
        />
        <label htmlFor="">offer amount</label>
        <input
          type="number"
          placeholder={`Enter amount ($${property.minPrice} - $${property.maxPrice})`}
          {...register("offerAmount", { required: "Offer amount is required" })}
          className="input input-bordered w-full"
        />
        {errors.offerAmount && (
          <p className="text-red-500 text-sm">{errors.offerAmount.message}</p>
        )}
        <label htmlFor="">user email</label>
        <input
          type="text"
          value={user.email}
          readOnly
          className="input input-bordered w-full"
        />
        <label htmlFor="">user name</label>
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="input input-bordered w-full"
        />
        {errors.buyingDate && (
          <p className="text-red-500 text-sm">{errors.buyingDate.message}</p>
        )}
        <button className="btn btn-primary w-full">Offer</button>
      </form>
    </div>
  );
};

export default MakeOffer;
