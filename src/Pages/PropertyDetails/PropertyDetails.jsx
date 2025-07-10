import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const PropertyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { axiosInstance } = useAxios();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch property details
  useEffect(() => {
    axiosInstance.get(`/properties/${id}`).then((res) => setProperty(res.data));
  }, [id, axiosInstance]);

  // Fetch reviews for this property
  //   useEffect(() => {
  //     axiosInstance
  //       .get(`/reviews?propertyId=${id}`)
  //       .then((res) => setReviews(res.data));
  //   }, [id, axiosInstance]);

  const handleAddToWishlist = async () => {
    try {
      const res = await axiosInstance.post("/wishlist", {
        propertyId: id,
        userEmail: user?.email,
        title: property.title,
        image: property.image,
        priceRange: property.priceRange,
        agent_name: property.agent_name,
      });
      if (res.data.insertedId) {
        Swal.fire("Added!", "Property added to wishlist.", "success");
      }
    } catch (error) {
      if (
        error.response ||
        error.response.data?.message === "Property already exists in wishlist"
      ) {
        Swal.fire(
          "Notice",
          "This property is already in your wishlist.",
          "info"
        );
      } else {
        console.error("Wishlist Error:", error);
      }
    }
  };

  const onSubmitReview = async (data) => {
    const review = {
      ...data,
      propertyId: id,
      date: new Date(),
    };

    try {
      const res = await axiosInstance.post("/reviews", review);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted", "success");
        setShowModal(false);
        reset();
        // Refresh reviews
        axiosInstance
          .get(`/reviews?propertyId=${id}`)
          .then((res) => setReviews(res.data));
      }
    } catch (error) {
      console.error("Review Error:", error);
    }
  };

  if (!property) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="text-gray-700">{property.description}</p>
      <p className="text-lg font-semibold">📍 {property.location}</p>
      <p className="text-lg">💰 {property.priceRange}</p>
      <p className="text-lg">Agent: {property.agent_name}</p>
      <p className="text-sm text-gray-500">
        Completed: {property.completed_year}
      </p>

      <button onClick={handleAddToWishlist} className="btn btn-primary btn-sm">
        Add to Wishlist
      </button>

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
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="p-4 border rounded bg-base-100">
                <h4 className="font-bold">{review.reviewerName}</h4>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Modal for Add Review */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 btn btn-sm"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Add a Review</h3>
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                {...register("reviewerName", { required: "Name is required" })}
              />
              {errors.reviewerName && (
                <p className="text-sm text-red-500">
                  {errors.reviewerName.message}
                </p>
              )}

              <input
                type="text"
                placeholder="Your Image URL"
                className="input input-bordered w-full"
                {...register("reviewerImage", {
                  required: "Image URL is required",
                })}
              />
              {errors.reviewerImage && (
                <p className="text-sm text-red-500">
                  {errors.reviewerImage.message}
                </p>
              )}

              <textarea
                placeholder="Your Review"
                className="textarea textarea-bordered w-full"
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

export default PropertyDetails;
