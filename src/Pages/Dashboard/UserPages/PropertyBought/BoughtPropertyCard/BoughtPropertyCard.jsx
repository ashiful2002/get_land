import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure/UseAxiosSecure";

const BoughtPropertyCard = ({ offer }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    image,
    title,
    location,
    agent_name,
    offerAmount,
    status,
    transactionId,
    propertyId,
    transaction_Id,
    _id,
  } = offer;
  console.log("new log from : ", transactionId, transaction_Id);

  const handlePay = () => {
    navigate(`/dashboard/payment/${_id}`);
  };
  console.log("form bought property card", offer);

  const { data: boughtProperty } = useQuery({
    queryKey: ["property_paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?propertyId=${propertyId}`
      );

      return res.data;
    },
  });
  console.log("mukto", boughtProperty);

  return (
    <div className="bg-white dark:bg-base-300 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover rounded"
      />
      <div className="mt-4 space-y-1">
        <h2 className="text-lg capitalize font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          📍 {location}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Agent: </strong> {agent_name}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <strong>Amount:</strong> $ {offerAmount}
        </p>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 capitalize">
          Status: {status}
        </p>

        {status === "accepted" && (
          <button
            onClick={handlePay}
            className="btn btn-primary btn-sm mt-2 w-full"
          >
            Pay Now
          </button>
        )}
        {status === "bought" && transaction_Id && (
          <p className="text-green-600 mt-2 text-sm">
            🧾 Transaction ID:{" "}
            <span className="font-mono">{transaction_Id}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default BoughtPropertyCard;
