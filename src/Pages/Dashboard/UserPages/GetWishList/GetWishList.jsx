import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaHandshake,
  FaLocationArrow,
  FaTrashAlt,
  FaUserCircle,
} from "react-icons/fa";
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
    data: wishlist,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user?.email}`);
      console.log(res.data);

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
  console.log(wishlist);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          No properties in wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover rounded-md"
              />
              <div className="mt-4 flex flex-col justify-between flex-grow space-y-3">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Location: </strong> {item.location}
                  </p>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Price Range:</strong> ${item.minPrice} - $
                    {item.maxPrice}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Verified:</strong>{" "}
                    <span
                      className={
                        item.status === "verified"
                          ? "text-green-600 font-semibold"
                          : "text-red-500"
                      }
                    >
                      {item.status === "verified" ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>

                {/* Agent Info */}
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    <strong>Agent:</strong> {item.agent_name}
                  </div>
                  {item.userImage ? (
                    <img
                      src={item.userImage}
                      className="w-10 h-10 object-cover rounded-full shrink-0"
                      alt={item.agent_name}
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => handleMakeOffer(item._id)}
                    className="btn btn-sm btn-primary flex items-center gap-2 hover:scale-105 transition"
                  >
                    <FaHandshake className="text-white" />
                    Make Offer
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-sm btn-error text-white flex items-center gap-2 hover:scale-105 transition"
                  >
                    <FaTrashAlt />
                    Remove
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
