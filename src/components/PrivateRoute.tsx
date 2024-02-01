import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = Cookies.get('token') !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default PrivateRoute;