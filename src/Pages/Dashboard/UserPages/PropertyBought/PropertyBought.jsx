import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useParams } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";
import BoughtPropertyCard from "./BoughtPropertyCard/BoughtPropertyCard";
import Section from "../../../../Components/Section/Section";

const PropertyBought = () => {
  const { id } = useParams();
  console.log(id);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["offered_property"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/make-offer?email=${user?.email}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  console.log(offers);

  return (
    <Section title="My offered Properties">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {offers.length === 0 ? (
          <p className="text-center text-gray-500">
            No properties offered yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <BoughtPropertyCard key={offer._id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default PropertyBought;
