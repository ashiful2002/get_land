import { useQueries } from "@tanstack/react-query";

const ReviewCard = ({ review }) => {
  const { _id, reviewerName, reviewerImage, description, propertyTitle, date } =
    review;
  console.log(reviewerImage);

  return (
    <div className="card bg-base-100 dark:bg-base-300 shadow-md">
      <div className="card-body">
        <div className="flex gap-3 mb-4">
          <div>
            <img
              src={reviewerImage || "https://i.ibb.co/1JKmxQgt/4.png"}
              alt={reviewerName}
              className="w-16 object-cover rounded-full"
            />
          </div>
          <div>
            {" "}
            <h3 className="font-semibold ">{reviewerName}</h3>
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
            <div>
              <p className="text-xs text-primary mt-2">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <p className="text-lg text-primary mt-2">{propertyTitle}</p>

        <p className="text-sm text-gray-600 dark:text-gray-300 first-letter:capitalize">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
