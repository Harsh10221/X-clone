import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  //   console.log("This is status", status);
  // console.log("This is data", userInfo);
  //   const isAuthenticated = status;
  // const isAuthenticated = status === 'succeeded' && userData

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
