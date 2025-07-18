import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Section from "../../../../Components/Section/Section";
import { FaBullhorn } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["admin-advertise-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  const handleAdvertise = async (propertyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/advertise-property/${propertyId}`);
        toast.success("adverrtised property");
      }
    });
    try {
      // Optionally show toast or refetch data
    } catch (err) {
      console.error("Advertise failed", err);
    }
  };

  return (
    <Section title="Advertise Property">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{property.title}</td>
                <td>
                  ${property.minPrice} - ${property.maxPrice}
                </td>
                <td>{property.agent_name}</td>
                <td>
                  <button
                    onClick={() => handleAdvertise(property._id)}
                    disabled={property.isAdvertised}
                    className="btn btn-sm btn-primary flex items-center gap-2"
                  >
                    <FaBullhorn />
                    {property.isAdvertised ? "Advertised" : "Advertise"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length === 0 && (
          <p className="text-center py-6">No verified properties found.</p>
        )}
      </div>
    </Section>
  );
};

export default AdvertiseProperty;
