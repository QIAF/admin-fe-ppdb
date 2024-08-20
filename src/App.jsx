import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User/User";
import Layout from "../Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import DetailUser from "./pages/User/DetailUser";
import ScoresPage from "./pages/Scores/ScoresPage";
import UpdateUser from "./pages/User/UpdateUser";
import MajorsPage from "./pages/Majors/MajorsPage";
import Login from "./pages/Login/Login";
import RoutesPage from "./Routes/RoutesPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RoutesPage />
    </>
  );
}

export default App;
