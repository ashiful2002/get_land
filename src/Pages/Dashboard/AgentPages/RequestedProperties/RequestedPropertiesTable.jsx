import React from "react";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";

const RequestedPropertiesTable = ({ properties }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // accept offer
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to accept this offer?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, accept it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/offers/${id}/accept`);
        return res.data;
      } else {
        throw new Error("User cancelled");
      }
    },
    onSuccess: () => {
      Swal.fire("Accepted!", "The offer has been accepted.", "success");
      queryClient.invalidateQueries(["Requested_properties"]);
    },
    onError: (error) => {
      if (error.message !== "User cancelled") {
        Swal.fire("Error", "Something went wrong while accepting.", "error");
      }
    },
  });

  // reject offer
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this offer?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, reject it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/offers/${id}/reject`);
        return res.data;
      } else {
        throw new Error("User cancelled");
      }
    },
    onSuccess: () => {
      Swal.fire("Rejected", "The offer has been rejected.", "info");
      queryClient.invalidateQueries(["Requested_properties"]);
    },
    onError: (error) => {
      if (error.message !== "User cancelled") {
        Swal.fire("Error", "Something went wrong while rejecting.", "error");
      }
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Property</th>
            <th>Location</th>
            <th>Buyer</th>
            <th>Email</th>
            <th>Offered Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((item, idx) => (
            <tr key={item._id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={item.image}
                  alt="property"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{item.title}</td>
              <td>{item.location}</td>
              <td>{item.buyerName}</td>
              <td>{item.buyerEmail}</td>
              <td>${item.offerAmount}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "pending"
                      ? "badge-warning"
                      : item.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="flex flex-wrap gap-2">
                {item.status === "pending" ? (
                  <>
                    <button
                      onClick={() => acceptMutation.mutate(item._id)}
                      className="btn btn-sm btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-500">No Action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedPropertiesTable;
