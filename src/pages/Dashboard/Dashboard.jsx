import React from "react";
import UserPage from "../User/UserPage";
import ResultPage from "../Result/ResultPage";

export default function Dashboard() {
  return (
    <div className="d-flex flex-column gap-4 mx-4">
      {/* <UserPage maxHeight={"45rem"} forPage={"homepage"} /> */}
      <ResultPage maxHeight={"10rem"} forPage={"result"} />
    </div>
  );
}
