import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const AddReview = ({ propertyTitle }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // GET Reviews
  const {
    data: reviews = [],
    refetch: refetchReview,
    isLoading: reviewLoading,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // POST Review
  const onSubmitReview = async (data) => {
    const review = {
      ...data,
      propertyId: id,
      propertyTitle,
      reviewer_email: user?.email,
      reviewerImage: user?.photoURL,

      date: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted", "success");
        setShowModal(false);
        reset();
        refetchReview(); // Refetch updated reviews
      }
    } catch (error) {
      console.error("Review Error:", error);
    }
  };

  return (
    <div>
      {/* Review Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-outline btn-sm"
          >
            Add a Review
          </button>
        </div>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded shadow bg-base-100"
              >
                <div className="flex items-center mb-3 gap-3">
                  <img
                    className="w-12 rounded-full"
                    src={review.reviewerImage}
                    alt=""
                    srcset=""
                  />
                  <h4 className="font-bold">{review.reviewerName}</h4>
                </div>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>{" "}
      {/* Modal for Add Review */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-gray-700 p-6 rounded w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 btn btn-sm"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-white">Add a Review</h3>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-3">
              <div className="flex flex-col-reverse gap-4 items-center justify-between">
                <input
                  type="text"
                  value={user.displayName}
                  placeholder="Your Name"
                  className="input input-bordered bg-gray-200 dark:bg-gray-700"
                  {...register("reviewerName", {
                    required: "Name is required",
                  })}
                />
                {errors.reviewerName && (
                  <p className="text-sm text-red-500">
                    {errors.reviewerName.message}
                  </p>
                )}
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-20 rounded-full "
                />

                {errors.reviewerImage && (
                  <p className="text-sm text-red-500">
                    {errors.reviewerImage.message}
                  </p>
                )}
              </div>

              <textarea
                placeholder="Your Review"
                className="textarea textarea-bordered bg-gray-200 dark:bg-gray-700 w-full"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}

              <button type="submit" className="btn btn-primary w-full">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReview;
