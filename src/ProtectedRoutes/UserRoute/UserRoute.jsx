import React from "react";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole/useUserRole";
import { Navigate, useLocation } from "react-router";
import Loading from "../../Components/Loading/Loading";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  const location = useLocation();
  if (loading || roleLoading) {
    return <Loading />;
  }

 

  return children;
};

export default UserRoute;
