import React, { useEffect, useState } from "react";
import Section from "../../../../Components/Section/Section";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";

const Review = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    fetch("http://localhost:3000/latest-review")
      .then((res) => res.json())
      .then((res) => setReviews(res));
  }, []);

  const { data: reviews = [] } = useQuery({
    queryKey: ["latestReview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-review");
      return res.data;
    },
  });
  // eikhane kivabe property er title add korbo seta shunte hobe. i have the property id

  return (
    <Section title="Latest Client Reviews">
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 w-full rounded-box">
        {reviews.map((review, index) => (
          <div
            key={review._id}
            id={`review${index}`}
            // className="carousel-item w-full justify-center px-4"
          >
            <div className="max-w-md mx-auto">
              {console.log(review)}
              <ReviewCard review={review} />
            </div>
          </div>
        ))}
      </div>

      {/* Optional carousel controls */}
      {/* <div className="flex justify-center gap-4 mt-6">
        {reviews.map((_, index) => (
          <a
            key={index}
            href={`#review${index}`}
            className="btn btn-xs btn-outline"
          >
            {index + 1}
          </a>
        ))}
      </div> */}
    </Section>
  );
};

export default Review;
