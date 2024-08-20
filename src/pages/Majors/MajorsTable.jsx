import React from "react";
import MajorsContainer from "./MajorsContainer";
import RowTable from "../../components/UI/Table/RowTable";
import { theadAllMajors } from "../../utils/dataObj";

export default function MajorsTable() {
  return (
    <MajorsContainer
      thead={theadAllMajors}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        ifEmpty={"Tidak ada data bidang keahlian!"}
        // data={exampleData}
        totalRow={5}
        totalCol={15}
        renderItem={(data) => {
          return (
            <tr key={data?.id}>
              <td>{data?.major_name}</td>
              <td>{data?.major_description}</td>
              <td>{data?.major_picture}</td>
            </tr>
          );
        }}
      />
    </MajorsContainer>
  );
}
