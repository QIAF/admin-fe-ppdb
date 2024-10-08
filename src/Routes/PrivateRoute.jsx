import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

export default function PrivateRoute() {
  const token = Cookies.get("token"); // Ambil token dari cookie

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}
