import React, { useEffect, useState } from "react";
import Section from "../../../../Components/Section/Section";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("/review_data.json")
      .then((res) => res.json())
      .then((res) => setReviews(res));
  }, []);
  return (
    <Section title="Latest Client Reviews">
      <div className="carousel w-full rounded-box">
        {reviews.map((review, index) => (
          <div
            key={review._id}
            id={`review${index}`}
            className="carousel-item w-full justify-center px-4"
          >
            <div className="max-w-md mx-auto">
              <ReviewCard review={review} />
            </div>
          </div>
        ))}
      </div>

      {/* Optional carousel controls */}
      <div className="flex justify-center gap-4 mt-6">
        {reviews.map((_, index) => (
          <a
            key={index}
            href={`#review${index}`}
            className="btn btn-xs btn-outline"
          >
            {index + 1}
          </a>
        ))}
      </div>
    </Section>
  );
};

export default Review;
