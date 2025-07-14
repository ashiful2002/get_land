import React, { use } from "react";
import { useLoaderData } from "react-router";
import Section from "../../Components/Section/Section";
import AdvertisementCard from "../Home/Components/AdvertisementCard.jsx/AdvertisementCard";

const AllProperties = () => {
  const properties = useLoaderData();

  return (
    <Section title="All Properties">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <AdvertisementCard key={property._id} property={property} />
        ))}
      </div>
    </Section>
  );
};

export default AllProperties;
