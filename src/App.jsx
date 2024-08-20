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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <UpdateUser /> */}
      <Login />
      {/* <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/users/detailUser/:id" element={<DetailUser />} />
          <Route path="/users/updateUser/:id" element={<UpdateUser />} />
          <Route path="/scores" element={<ScoresPage />} />
          <Route path="/majors" element={<MajorsPage />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
