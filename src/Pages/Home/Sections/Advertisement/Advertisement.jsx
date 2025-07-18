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
      const res = await axiosSecure.get("/advertised-properties");
      return res.data;
    },
  });
  console.log(properties);

  if (propertyLoading) {
    return <Loading />;
  }
  return (
    <Section className="" title="Advertised Properties">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-fit">
          {properties.length > 0 ? (
            properties.map((property) => (
              <AdvertisementCard key={property._id} property={property} />
            ))
          ) : (
            <p>No advertised property yet</p>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Advertisement;
