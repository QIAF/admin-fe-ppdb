import React from "react";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  const user = localStorage.getItem("token");
  // menyimpan token jwt

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}
