import React from "react";
import useUserRole from "../../../Hooks/useUserRole/useUserRole";
import Loading from "../../../Components/Loading/Loading";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AgentDashboard from "../AgentDashBoard/AgentDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";
import Forbidden from "../../../Pages/Forbidden/Forbidden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }
  if (role === "admin") {
    return <AdminDashboard />;
  }
  if (role === "agent") {
    return <AgentDashboard />;
  }
  if (role === "user") {
    return <UserDashboard />;
  }
  return <Forbidden />;
};

export default DashboardHome;
