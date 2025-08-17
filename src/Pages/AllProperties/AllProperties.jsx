import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/UseAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Section from "../../Components/Section/Section";
import PropertyCard from "./PropertyCard/PropertyCard";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("minPrice");
  const [properties, setProperties] = useState([]);

  // ✅ Load all properties initially
  const { isLoading } = useQuery({
    queryKey: ["allProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      setProperties(res.data); // save to local state
      return res.data;
    },
  });

  // ✅ Manual search using mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.get(
        `/properties?search=${searchText}&sort=${sortOrder}&sortBy=${sortBy}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      setProperties(data);
    },
  });

  const handleSearch = () => {
    mutate();
  };

  if (isLoading || isPending) return <Loading />;

  return (
    <Section title="All Properties">
      <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input
          type="search"
          placeholder="Search Property"
          className="input input-bordered"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ✅ Press Enter to search
        />

        <div className="flex justify-between gap-10">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered"
          >
            <option value="minPrice">Sort by Min Price</option>
            <option value="maxPrice">Sort by Max Price</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {properties.length === 0 ? (
          <p className="text-center">No properties found.</p>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </Section>
  );
};

export default AllProperties;
