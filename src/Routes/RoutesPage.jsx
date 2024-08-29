import React from "react";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import DetailUser from "../pages/User/DetailUser";
import UpdateUser from "../pages/User/UpdateUser";
import ScoresPage from "../pages/Scores/ScoresPage";
import MajorsPage from "../pages/Majors/MajorsPage";
import { Route, Routes } from "react-router";
import Layout from "../../Layout";
import User from "../pages/User/User";
import PrivateRoute from "./PrivateRoute";
import ResultPage from "../pages/Result/ResultPage";

export default function RoutesPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<User />} />
            <Route path="/users/detailUser/:id" element={<DetailUser />} />
            <Route path="/users/updateUser/:id" element={<UpdateUser />} />
            <Route path="/scores" element={<ScoresPage />} />
            <Route path="/finalResults" element={<ResultPage />} />
            <Route path="/majors" element={<MajorsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
