import React from "react";
import ResultContainer from "./ResultContainer";
import RowTable from "../../components/UI/Table/RowTable";

export default function ResultTable() {
  return (
    <ResultContainer
      thead={theadStudentPassed}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        ifEmpty={"Upsss !! tidak ada data"}
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
    </ResultContainer>
  );
}
