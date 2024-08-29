import React from "react";
import ResultContainer from "./ResultContainer";
import RowTable from "../../components/UI/Table/RowTable";

export default function ResultTable() {
  return (
    <ResultContainer
      thead={theadKriteria}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        ifEmpty={"Tidak ada data makanan!"}
        data={exampleData}
        totalRow={5}
        totalCol={15}
        renderItem={(data) => {
          return (
            <tr key={data?.id}>
              <td>{data?.user_id}</td>
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
