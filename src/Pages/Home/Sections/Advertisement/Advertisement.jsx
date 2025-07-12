import { useEffect, useState } from "react";
import Section from "../../../../Components/Section/Section";
import AdvertisementCard from "../../Components/AdvertisementCard.jsx/AdvertisementCard";
import { useLoaderData } from "react-router";

const Advertisement = () => {
  const properties = useLoaderData();

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
