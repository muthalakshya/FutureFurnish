import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ShopContext } from "../content/ShopContext"; // Your context for authentication

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, userType } = useContext(ShopContext);

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user type is not in allowedRoles, redirect to home or unauthorized page
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Render child components
};

export default ProtectedRoute;
