import { thead } from "../../utils/dataObj";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import RowTable from "../../components/UI/Table/RowTable";
import axios from "axios";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [error, setIsError] = useState();
  const [isPending, setIsPending] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/studentData"
        // {
        //   headers: {
        //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJmYXJ6ZXQiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWludXNlcnpldEBnbWFpbC5jb20iLCJpYXQiOjE3MTk5MDAyMzcsImV4cCI6MTcyMDE1OTQzN30.VflHkndAXwggjIgWOwc5CQIgA2sYfYZcaA5tUSY1kRI`,
        //   },
        // }
      );
      console.log("API Response:", response.data);
      setData(response.data.data.allStudentData); // Asumsi data berada di dalam results
      setIsPending(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <UserTable
      thead={thead}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        data={data}
        ifEmpty={"Tidak ada data Riwayat Pemilihan!"}
        totalRow={3}
        totalCol={8}
        renderItem={(data, index, offset) => {
          return (
            <tr className="text-nowrap cursor-pointer" key={data?.id}>
              {/* <td>{data?.id}</td> */}
              {/* <td>{data?.user_id}</td> */}
              <td>{data?.nisn}</td>
              <td>{data?.student_name}</td>
              <td>{data?.student_gender}</td>
              {/* <>{data?.father_birth}</> */}
            </tr>
          );
        }}
      />
    </UserTable>
  );
}
