import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Rchart = ({ stats }) => {
  const { totalProperties, totalReviews, totalUsers, totalSales } = stats;

  const data = [
    { name: "Properties", value: totalProperties },
    { name: "Reviews", value: totalReviews },
    { name: "Users", value: totalUsers },
    { name: "Sales (in thousand)", value: totalSales / 1000 },
  ];

  return (
    <div className="w-full h-[300px] overflow-x-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Rchart;
