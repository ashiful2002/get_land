import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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

  const {
    data: property,
    isLoading: isPropertyLoading,
    isError: isPropertyError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      console.log("response data ", res.data);

      return res.data;
    },
  });

  // const {
  //   data: reviews = [],
  //   refetch: refetchReviews,
  //   isLoading: isReviewLoading,
  // } = useQuery({
  //   queryKey: ["reviews", id],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
  //     return res.data;
  //   },
  //   enabled: !!id,
  // });

  const handleAddToWishlist = async () => {
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
      }
    } catch (error) {
      if (
        error.response ||
        error.response.data?.message === "Property already exists in wishlist"
      ) {
        Swal.fire(
          "Notice",
          "This property is already in your wishlist.",
          "info"
        );
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
  console.log(property);

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
