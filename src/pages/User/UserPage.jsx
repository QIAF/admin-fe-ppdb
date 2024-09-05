import { thead } from "../../utils/dataObj";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import RowTable from "../../components/UI/Table/RowTable";
import axios from "axios";

export default function UserPage() {
  const [data, setData] = useState([]);
  const [error, setIsError] = useState();
  const [isPending, setIsPending] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://be-ppdb-online-update.vercel.app/api/v1/studentData"
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
  if (isPending) return <p>Loading...</p>;
  return (
    <UserTable
      thead={thead}
      pageFor={"homepage"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        data={data}
        ifEmpty={"Upsss !! data tidak tersedia..."}
        totalRow={3}
        totalCol={8}
        renderItem={(data, index, offset) => {
          return (
            <tr className="text-nowrap cursor-pointer" key={data?.id}>
              {/* <td>{data?.id}</td> */}
              {/* <td>{data?.user_id}</td> */}
              <td>{index + 1}</td>
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
