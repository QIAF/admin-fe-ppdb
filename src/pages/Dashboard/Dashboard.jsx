import React from "react";
import UserPage from "../User/UserPage";

export default function Dashboard() {
  return (
    <div className="d-flex flex-column gap-4 mx-4">
      <UserPage maxHeight={"45rem"} forPage={"homepage"} />
    </div>
  );
}
