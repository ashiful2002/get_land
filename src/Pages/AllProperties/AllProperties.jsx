import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import AdvertisementCard from "../Home/Components/AdvertisementCard.jsx/AdvertisementCard";
import Section from "../../Components/Section/Section";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState("minPrice"); // 'minPrice' or 'maxPrice'

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", searchText, sortOrder, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/properties?search=${searchText}&sort=${sortOrder}&sortBy=${sortBy}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <Section title="All Properties">
      <div className="mb-4 flex gap-4 justify-center items-center">
        <input
          type="search"
          placeholder="Search Property"
          className="input input-bordered"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered"
        >
          <option value="minPrice">{`Price (Low > High)`}</option>
          <option value="maxPrice">{`Price (High > Low)`}</option>
        </select>

        {/* <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.length === 0 ? (
          <p className="text-center">No properties found.</p>
        ) : (
          properties.map((property) => (
            <AdvertisementCard key={property._id} property={property} />
          ))
        )}
      </div>
    </Section>
  );
};

export default AllProperties;
