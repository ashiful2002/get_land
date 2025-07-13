import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // fetch all data  using tanstak query
  const {
    data: reviews = [],
    isLoading: reviewLoading,
    isError: reviewError,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  // delete mutation

  const deleteReview = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Review has been removed.", "success");
      queryClient.invalidateQueries("allReviews");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the review.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReview.mutate(id);
      }
    });
  };

  if (reviewLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Manage All Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-4 shadow bg-white dark:bg-base-200 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{review.reviewerName}</h4>
                    <p className="text-sm text-gray-600">
                      {review.reviewer_email}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 whitespace-pre-line">
                  {review.description}
                </p>
                <p className="text-sm text-gray-500">
                  Review at:{" "}
                  {new Date(review.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  {deleteReview.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReviews;
