import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);

  // Fetch property by ID
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  // Mutation to update
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/properties/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Property has been updated.", "success");
      queryClient.invalidateQueries(["property", id]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update property.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const priceRange = form.priceRange.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;

    updateMutation.mutate({
      title,
      location,
      priceRange,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
    });

    setUpdating(false);
  };

  if (isLoading) return <p>Loading property...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          defaultValue={property.title}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="location"
          defaultValue={property.location}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />
       
        <input
          type="number"
          name="minPrice"
          defaultValue={property.minPrice}
          placeholder="Min Price"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="maxPrice"
          defaultValue={property.maxPrice}
          placeholder="Max Price"
          className="input input-bordered w-full"
        />
        <button type="submit" disabled={updating} className="btn btn-primary">
          {updating ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
