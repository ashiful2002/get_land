import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardStats from "./DashboardStats";
import Loading from "../../../Components/Loading/Loading";

const Statastics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading: isPropertyLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties`);
      return res.data;
    },
  });

  const { data: users = [], isLoading: isUserLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
  });

  // Loading state
  if (isPropertyLoading || isUserLoading || isReviewsLoading) {
    return <Loading />;
  }

  // Calculate dynamic stats
  const totalSales = properties.reduce((total, property) => {
    const min = parseFloat(property.minPrice) || 0;
    const max = parseFloat(property.maxPrice) || 0;
    return total + (min + max) / 2;
  }, 0);

  const stats = {
    totalProperties: properties.length,
    totalUsers: users.length,
    totalReviews: reviews.length,
    totalSales: Math.floor(totalSales), // or toFixed(2) if you want decimals
  };

  return <DashboardStats stats={stats} />;
};

export default Statastics;
