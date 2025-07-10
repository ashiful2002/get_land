import React from "react";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole/useUserRole";
import { Navigate, useLocation } from "react-router";
import Loading from "../../Components/Loading/Loading";

const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  const location = useLocation();
  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user || role !== "agent") {
    return (
      <Navigate to="/forbidden" state={{ from: location }} replace></Navigate>
    );
  }

  return children;
};

export default AgentRoute;
