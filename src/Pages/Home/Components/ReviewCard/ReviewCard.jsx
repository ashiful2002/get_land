const ReviewCard = ({ review }) => {
  const { reviewerName, reviewerImage, description, propertyTitle } = review;

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body text-center">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={reviewerImage}
            alt={reviewerName}
            className="w-32  rounded-full mx-auto"
          />
        </div>
        <h3 className="font-semibold ">-{reviewerName}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-primary mt-2">🏡 {propertyTitle}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
