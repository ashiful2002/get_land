import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaHandshake, FaTrashAlt } from "react-icons/fa";

import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch wishlist with react-query
  const {
    data: wishlist = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/wishlist");
      return res.data;
    },
  });

  // Navigate to offer form
  const handleMakeOffer = (id) => {
    navigate(`/dashboard/make-offer/${id}`);
  };

  // Delete wishlist item and refetch
  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      console.log(res.data);

      if (res.data.deletedCount) {
        Swal.fire("Deleted!", "Property removed from wishlist.", "success");
        queryClient.invalidateQueries(["wishlist", user?.email]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Loading & error state
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load wishlist.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-center">No properties in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover rounded"
              />
              <div className="mt-4 space-y-2">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-gray-700">📍 {item.location}</p>
                <p className="text-sm text-gray-700">
                  🧑‍💼 Agent: {item.agent_name}
                </p>
                <p className="text-sm text-gray-700">
                  🔖 Price: {item.priceRange}
                </p>
                <p className="text-sm text-gray-500">
                  ✅ Verified: {item.isVerified ? "Yes" : "No"}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleMakeOffer(item._id)}
                    className="btn btn-sm btn-primary flex items-center gap-2"
                  >
                    <FaHandshake /> Make Offer
                  </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-error flex items-center gap-2"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
