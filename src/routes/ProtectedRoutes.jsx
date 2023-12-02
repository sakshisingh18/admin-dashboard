import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("authToken");
  return token ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectedRoutes;
