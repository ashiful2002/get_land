import { useQueries } from "@tanstack/react-query";

const ReviewCard = ({ review }) => {
  const { _id, reviewerName, reviewerImage, description, propertyTitle, date } =
    review;

  return (
    <div className="card bg-base-100 dark:bg-base-300 shadow-md">
      <div className="card-body text-center">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={reviewerImage}
            alt={reviewerName}
            className="w-32 object-cover rounded-full mx-auto"
          />
        </div>
        <h3 className="font-semibold ">-{reviewerName}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <p className="text-xs text-primary mt-2">🏡 {propertyTitle}</p>
        <p className="text-xs text-primary mt-2">
          Review at:{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
