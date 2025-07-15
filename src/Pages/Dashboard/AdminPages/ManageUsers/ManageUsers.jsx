import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../../../Components/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeAdmin = async ({ email, role }) => {
    const res = await Swal.fire({
      title: "make Admin?",
      text: "Are you sure to make admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Nooooo !",
    });

    if (res.isConfirmed) {
      axiosSecure.put(`/users/${email}/role`, { role });
      toast.success("Promoted to admin");
      queryClient.invalidateQueries(["users"]);
    }
  };

  const makeAgemt = async ({ email, role }) => {
    const res = await Swal.fire({
      title: "Make Agent?",
      text: "Are you sure to make agent? Agent can add pepperty for sell",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Agent",
      cancelButtonText: "Cancel",
    });

    if (res.isConfirmed) {
      await axiosSecure.put(`/users/${email}/role`, { role });
      toast.success("user updated as agent");
      queryClient.invalidateQueries(["users"]);
    }
  };

  const markAsFraud = async (email) => {
    const result = await Swal.fire({
      title: "Mark as Fraud?",
      text: "Are you sure you want to mark this agent as fraud? This action will hide their properties.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark as Fraud",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.put(`/users/${email}/fraud`);
        Swal.fire("Marked!", "The user has been marked as fraud.", "success");
        queryClient.invalidateQueries(["users"]);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const deleteUser = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete a user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${email}`);
      if (res.data.deleteCount > 0) {
        toast.success("Deleted Successfully");
        queryClient.invalidateQueries(["users"]);
      }
      Swal.fire("Oops", "User not deleted. Something went wrong.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status || "active"}</td>
                <td className="flex gap-2 flex-wrap">
                  {u.status === "fraud" ? (
                    <span className="badge badge-error">Fraud</span>
                  ) : (
                    <>
                      {/* Admin Button */}
                      {u.role === "admin" ? (
                        <button className="btn btn-sm btn-outline btn-disabled">
                          Already Admin
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            makeAdmin({ email: u.email, role: "admin" })
                          }
                          className="btn btn-sm btn-success"
                        >
                          Make Admin
                        </button>
                      )}

                      {/* Agent Button */}
                      {u.role === "agent" ? (
                        <button className="btn btn-sm btn-outline btn-disabled">
                          Already Agent
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            makeAgemt({ email: u.email, role: "agent" })
                          }
                          className="btn btn-sm btn-info"
                        >
                          Make Agent
                        </button>
                      )}

                      {/* Mark as Fraud (only if agent and not fraud) */}
                      {u.role === "agent" && (
                        <button
                          onClick={() => markAsFraud(u.email)}
                          className="btn btn-sm btn-warning"
                        >
                          Mark as Fraud
                        </button>
                      )}
                    </>
                  )}

                  {/* Delete button (always shown) */}
                  <button
                    onClick={() => deleteUser(u.email)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
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

export default ManageUsers;
