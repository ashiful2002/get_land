import React from "react";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
