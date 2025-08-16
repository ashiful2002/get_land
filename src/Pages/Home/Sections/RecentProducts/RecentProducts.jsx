import React from "react";
import Section from "../../../../Components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../Hooks/useAxios";
import RecentCard from "./RecentCard/RecentCard";

const RecentProducts = () => {
  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const data = await axiosInstance.get("/properties");
      return data.data;
    },
  });
  console.log("from Recent properties", properties);

  return (
    <Section title="Recently Added Products">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-autot">
          {properties.length > 0 ? (
            properties.map((property) => (
              <RecentCard key={property._id} property={property} />
            ))
          ) : (
            <p>No advertised property yet</p>
          )}
        </div>
      </div>
    </Section>
  );
};

export default RecentProducts;
