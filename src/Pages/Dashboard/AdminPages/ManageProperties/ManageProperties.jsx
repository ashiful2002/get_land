import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all properties added by agents
  const {
    data: allProperties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allAgentProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  // Mutation for verifying property
  const verifyProperty = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/verify/${id}`, {
        status: "verified",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Verified!", "Property has been verified.", "success");
      queryClient.invalidateQueries(["allAgentProperties"]);
    },
  });

  // Mutation for rejecting property
  const rejectProperty = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/reject/${id}`, {
        status: "rejected",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Property has been rejected.", "info");
      queryClient.invalidateQueries(["allAgentProperties"]);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading properties.</p>;
// console.log(allProperties);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Agent Properties</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Agent</th>
              <th>Email</th>
              <th>Price Range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProperties.map((property) => (
              <tr key={property._id}>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.agent_name}</td>
                <td>{property.agent_email}</td>
                <td>{property.priceRange}</td>
                <td>
                  {/* {console.log(property.status)} */}
                  {property.status === "verified" ? (
                    <span className="badge badge-success">Verified</span>
                  ) : property.status === "rejected" ? (
                    <span className="badge badge-error">Rejected</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>
                {/* <td className="space-x-2">
                  {property.status === "pending" && (
                    <>
                      <button
                        onClick={() => verifyProperty.mutate(property._id)}
                        className="btn btn-success btn-xs"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => rejectProperty.mutate(property._id)}
                        className="btn btn-error btn-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(property.status === "verified" ||
                    property.status === "rejected") && (
                    <span className="italic text-gray-500">No Action</span>
                  )}
                </td> */}
                <td className="space-x-2 flex">
                  <button
                    onClick={() => verifyProperty.mutate(property._id)}
                    className="btn btn-success btn-xs"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => rejectProperty.mutate(property._id)}
                    className="btn btn-error btn-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
