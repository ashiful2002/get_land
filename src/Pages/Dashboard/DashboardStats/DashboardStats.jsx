import { useQuery } from "@tanstack/react-query";
import { FaHome, FaUsers, FaStar, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/UseAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { Ear } from "lucide-react";
import { useState } from "react";
import Rchart from "./Rchart";

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: <FaHome className="text-3xl text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers className="text-3xl text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      icon: <FaStar className="text-3xl text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      title: "Total Sales",
      value: `$${stats.totalSales}`,
      icon: <FaDollarSign className="text-3xl text-purple-600" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-xl p-5 shadow-md flex items-center gap-4 ${card.color}`}
        >
          <div className="p-3 rounded-full bg-white shadow">{card.icon}</div>
          <div>
            <p className="text-gray-500 dark:text-gray-600 text-sm">
              {card.title}
            </p>
            <h2 className="text-2xl font-bold dark:text-gray-600">
              {card.value}
            </h2>
          </div>
        </div>
      ))}
      <Rchart stats={stats}/>
    </div>
  );
};

export default DashboardStats;
