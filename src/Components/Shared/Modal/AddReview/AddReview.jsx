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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4  shadow-gray-800/40 dark:border-2 dark:border-gray-500/70 rounded shadow bg-base-100"
              >
                <div className="flex items-center mb-3 gap-3">
                  <img
                    className="w-12 rounded-full"
                    src={
                      review.reviewerImage || "https://i.ibb.co/1JKmxQgt/4.png"
                    }
                    alt={review.reviewerName}
                  />
                  <div>
                    <h4 className="font-bold capitalize">
                      {review.reviewerName}
                    </h4>
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name={`rating-${review._id}`}
                          className="mask mask-star-2 bg-primary"
                          defaultChecked={star === Number(review.rating)}
                          disabled
                        />
                      ))}
                    </div>

                    <p className="text-sm">
                      {new Date(review.date).toLocaleDateString("en-UK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
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
          <div className="bg-gray-100 dark:bg-gray-900/40 p-6 rounded w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 btn btn-sm"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-2xl text-center font-bold mb-4 text-gray-600 dark:text-gray-200">
              Add a Review
            </h3>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-3">
              {errors.rating && (
                <p className="text-sm text-red-500 text-center">
                  {errors.rating.message}
                </p>
              )}
              <div className="flex flex-col-reverse gap-4 justify-between">
                <input
                  type="text"
                  value={user.displayName}
                  placeholder="Your Name"
                  className="input input-bordered bg-gray-200 dark:bg-gray-700"
                  {...register("reviewerName", {})}
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
              {/* Rating field */}
              <div className="rating flex my-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    value={star}
                    {...register("rating", { required: "Rating is required" })}
                    name="rating"
                    className="mask mask-star-2 bg-primary"
                    aria-label={`${star} star`}
                  />
                ))}
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
