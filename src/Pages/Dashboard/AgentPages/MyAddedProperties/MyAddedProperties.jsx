import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch agent's properties
  const { data: agentsProperties = [], isLoading } = useQuery({
    queryKey: ["agentsProperty", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/agent/${user.email}`);
      return res.data;
    },
  });

  // Delete mutation
  const deleteProperty = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/properties/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Property has been removed.", "success");
      queryClient.invalidateQueries(["agentsProperty", user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete property.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty.mutate(id);
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/update-property/${id}`);
  };

  if (isLoading) return <div className="text-center py-10">Loading your properties...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">My Added Properties</h2>
      {agentsProperties.length === 0 ? (
        <p className="text-gray-500">No properties added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agentsProperties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-md p-4 bg-white dark:bg-base-200 space-y-3"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-60 object-cover rounded"
              />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p>
                <strong>Location:</strong> {property.location}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={property.userImage}
                  alt={property.agent_name}
                  className="w-10 h-10 rounded-full"
                />
                <p>
                  <strong>Agent:</strong> {property.agent_name}
                </p>
              </div>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    property.status === "verified"
                      ? "badge-success"
                      : property.verification === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {property.status || "pending"}
                </span>
              </p>
              <p>
                <strong>Price Range:</strong> ${property.minPrice} - ${property.maxPrice}
              </p>
             

              <div className="flex gap-3">
                {property.verification !== "rejected" && (
                  <button
                    onClick={() => handleUpdate(property._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>
                )}
                <button
                  onClick={() => handleDelete(property._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;
