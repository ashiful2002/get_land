import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import RequestedPropertiesTable from "./RequestedPropertiesTable.jsx";
import useAuth from "../../../../Hooks/useAuth.jsx";
import Section from "../../../../Components/Section/Section.jsx";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: requestedProperties = [], isLoading } = useQuery({
    queryKey: ["Requested_properties"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/make-offer?agent_email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <Section title="Requested Properties">
      <RequestedPropertiesTable properties={requestedProperties} />
    </Section>
  );
};

export default RequestedProperties;
