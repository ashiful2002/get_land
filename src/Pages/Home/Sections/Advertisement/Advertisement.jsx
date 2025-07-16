import { useEffect, useState } from "react";
import Section from "../../../../Components/Section/Section";
import AdvertisementCard from "../../Components/AdvertisementCard.jsx/AdvertisementCard";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: properties = [], isLoading: propertyLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("properties");
      return res.data;
    },
  });

  if (propertyLoading) {
    return <Loading />;
  }
  return (
    <Section title="Featured Properties">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <AdvertisementCard key={property._id} property={property} />
        ))}
      </div>
    </Section>
  );
};

export default Advertisement;
