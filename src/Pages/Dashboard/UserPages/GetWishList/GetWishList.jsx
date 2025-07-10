import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const Wishlist = () => {
  const { user } = useAuth();
  const { axiosInstance } = useAxiosSecure();
  // console.log(user);

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">
          You have no properties in your wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  Agent: {item.agent_name}
                </p>
                <p className="text-sm text-gray-600">
                  Price: {item.priceRange}
                </p>
                <p className="text-sm text-gray-400 break-words">
                  Property ID: {item.propertyId}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
