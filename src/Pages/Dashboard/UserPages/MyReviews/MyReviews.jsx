import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Section from "../../../../Components/Section/Section";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: myReviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    },
  });
  const deleteReviewMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted", "Your review has been deleted", "success");
      queryClient.invalidateQueries(["myReviews", user?.email]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete the review.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire(
      "Are you sure?",
      "Do you want to sure delete this?",
      "warning",
      true,
      "Yes Delete it"
    ).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation.mutate(id);
      }
    });
  };

  if (reviewsLoading) {
    return <Loading />;
  }
  // console.log(myReviews);
  if (myReviews.length === 0) {
    return (
      <Section title="My Reviews">
        <p className="text-center text-gray-500">
          You haven't write any review yet.
        </p>
      </Section>
    );
  }
  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border rounded shadow bg-white dark:bg-base-200 space-y-3"
            >
              <h3 className="text-xl font-semibold text-primary">
                {review.propertyTitle}
              </h3>
              <p>
                <span className="font-medium">Agent:</span>{" "}
                {review.agent_name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Reviewed at:</span>{" "}
                {new Date(review.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-700 dark:text-gray-400 whitespace-pre-line">
                {review.description}
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-error btn-sm text-white"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
