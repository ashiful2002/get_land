import React from "react";
import Section from "../../../../Components/Section/Section";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/UseAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../Components/Loading/Loading";

const SoldProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: agentSales = [], isLoading } = useQuery({
    queryKey: ["agentSales", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/make-offer?agent_email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const soldOffers = agentSales.filter((offer) => offer.status === "bought");
  const totalSalesAmount = soldOffers.reduce(
    (sum, offer) => sum + parseFloat(offer.offerAmount || 0),
    0
  );

  // console.log(agentSales);

  return (
    <Section title="My Sold Properties">
      {soldOffers.length === 0 ? (
        <p className="text-center text-gray-500">No properties sold yet.</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-4 text-green-700">
            Total Sales: ${totalSalesAmount.toFixed(2)}
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Property Title</th>
                  <th>Buyer</th>
                  <th>Price Offered</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {soldOffers.map((offer, index) => (
                  <tr key={offer._id}>
                    <td>{index + 1}</td>
                    <td>{offer.title || "N/A"}</td>
                    <td>
                      {offer.buyerName || "N/A"} <br />
                      <span className="text-sm text-gray-500">
                        {offer.buyerEmail}
                      </span>
                    </td>
                    <td>${offer.offerAmount}</td>
                    <td>
                      <span className="badge badge-success text-white capitalize">
                        {offer.status}
                      </span>
                    </td>
                    <td>{offer.transaction_Id || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Section>
  );
};

export default SoldProperties;
