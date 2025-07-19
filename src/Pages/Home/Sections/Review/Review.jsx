import React, { useEffect, useState } from "react";
import Section from "../../../../Components/Section/Section";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import axios from "axios";

const Review = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["latestReview"],
    queryFn: async () => {
      const res = await axios.get("https://real-estate-server-flax.vercel.app/latest-review");
      return res.data;
    },
  });

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
              <ReviewCard review={review} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Review;
