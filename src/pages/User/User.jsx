import axios from "axios";
import React, { useEffect, useState } from "react";
import { thead } from "../../utils/dataObj";
import UserTable from "./UserTable";
import RowTable from "../../components/UI/Table/RowTable";
import { useNavigate } from "react-router";

export default function User() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
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

  const onNavigate = (userData, offset) => {
    navigate(`/users/detailUser/${userData.id}`, {
      state: { data: userData, offset: offset },
    });
  };
  return (
    <UserTable
      thead={thead}
      pageFor={"user"}
      className={"border"}
      maxHeight={"45rem"}
    >
      <RowTable
        isError={isError}
        isPending={isPending}
        ifEmpty={"Tidak ada data Riwayat Pemilihan!"}
        data={data}
        totalRow={3}
        totalCol={8}
        renderItem={(data, index) => {
          return (
            <tr
              onClick={() => onNavigate(data)}
              className="text-nowrap cursor-pointer"
              key={index}
            >
              <td>{data?.user_id}</td>
              <td>{data?.student_name}</td>
              <td>{data?.student_gender}</td>
              <td>{data?.nisn}</td>
            </tr>
          );
        }}
      />
    </UserTable>
  );
}
