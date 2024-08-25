import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  const isTokenValid = (token: string | null) => {
    return token && token !== "expired";
  };

  if (!isTokenValid(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
