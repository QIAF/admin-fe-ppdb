import React from "react";
import ScoresContainer from "./ScoresContainer";
import RowTable from "../../components/UI/Table/RowTable";
import { theadAllScores } from "../../utils/dataObj";

export default function ScoresTable() {
  return (
    <ScoresContainer
      thead={theadAllScores}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        ifEmpty={"Upsss !! data tidak tersedia..."}
        data={exampleData}
        totalRow={5}
        totalCol={15}
        renderItem={(data) => {
          return (
            <tr key={data?.id}>
              <td>{data?.id}</td>
              <td>{data?.health_score}</td>
              <td>{data?.interview_score}</td>
              <td>{data?.average_final_score}</td>
            </tr>
          );
        }}
      />
    </ScoresContainer>
  );
}
