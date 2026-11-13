
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminProtectedRoute = () => {

  const token = localStorage.getItem("token");

  // No token: redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check token expiration
    if (
      decodedToken.exp &&
      decodedToken.exp * 1000 < Date.now()
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return <Navigate to="/login" replace />;
    }

    // Check admin role
    if (decodedToken.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    // Authorized admin
    return <Outlet />;

  } catch (error) {

    // Invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
