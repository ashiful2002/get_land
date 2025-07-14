import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import AddReview from "../../Components/Shared/Modal/AddReview/AddReview";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../Components/Loading/Loading";

const PropertyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [isWishlist, setIsWishlist] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: property,
    isLoading: isPropertyLoading,
    isError: isPropertyError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  const handleAddToWishlist = async () => {
    // Check if property data and user email are available
    if (
      !user?.email ||
      !property?.title ||
      !property?.image ||
      !property?.priceRange ||
      !property?.agent_name
    ) {
      Swal.fire(
        "Missing data",
        "Please wait for the property to fully load.",
        "warning"
      );
      return;
    }
    try {
      const res = await axiosSecure.post("/wishlist", {
        propertyId: id,
        userEmail: user?.email,
        title: property.title,
        image: property.image,
        priceRange: property.priceRange,
        agent_name: property.agent_name,
      });
      if (res.data.insertedId) {
        Swal.fire("Added!", "Property added to wishlist.", "success");
        setIsWishlist(true);
        navigate("/dashboard/wishlist");
      }
    } catch (error) {
      if (
        error.response ||
        error.response.data?.message === "Property already exists in wishlist"
      ) {
        Swal.fire({
          title: "This property is already in your wishlist.",
          text: "Want to view your wishlist?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes, Show my wishlist!",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/dashboard/wishlist");
          }
        });
      } else {
        console.error("Wishlist Error:", error);
      }
    }
  };

  if (isPropertyLoading) return <Loading />;
  if (isPropertyError) {
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load property.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-700 dark:text-gray-200">{property.description}</p>
      <p className="text-lg font-semibold">
        📍 {property.location || "no data"}
      </p>
      <p className="text-lg">💰 {property.priceRange}</p>
      <p className="text-lg">Agent: {property.agent_name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-200">
        Completed: {property.completed_year}
      </p>
      <button
        disabled={isWishlist}
        onClick={handleAddToWishlist}
        className="btn btn-primary btn-sm"
      >
        {isWishlist ? "Added to wishlist" : " Add to Wishlist"}
      </button>
      <AddReview propertyTitle={property.title} />
    </div>
  );
};

export default PropertyDetails;
