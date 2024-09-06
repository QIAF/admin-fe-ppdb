import axios from "axios";
import React, { useEffect, useState } from "react";
import { thead } from "../../utils/dataObj";
import UserTable from "./UserTable";
import RowTable from "../../components/UI/Table/RowTable";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export default function User() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const token = Cookies.get("token");
    console.log("Token untuk article:", token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `https://be-ppdb-online-update.vercel.app/api/v1/studentData`,
        config
      );
      const studentData = response.data.data?.allStudentData ?? [];
      const reportScores = response.data.data?.allReportScore ?? [];
      const finalScores = response.data.data?.allFinalScore ?? [];
      console.log("Student Data", studentData);
      console.log("ReportScore", reportScores);
      console.log("FINALLLLL", finalScores);

      const combinedData = studentData.map((student) => {
        // Cari report berdasarkan user_id
        const report = reportScores.find(
          (score) => String(score.id) === String(student.id)
        );
        const finalScore = finalScores.find((score) => score.id === student.id);

        // Debugging untuk melihat hasil pencarian
        console.log("User ID:", student.id);
        console.log("Matching Report:", report);
        console.log("Matching FinalScore:", finalScore);

        // Gabungkan data student dengan report yang ditemukan
        return { ...student, report, finalScore };
      });
      console.log("Combined Data:", combinedData); // Cek data gabungan
      setData(combinedData);
      setFilteredData(combinedData);

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

  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item.student_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  }, [searchTerm, data]);

  const handleInputSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onNavigate = (userData, offset) => {
    navigate(`/users/detailUser/${userData.id}`, {
      state: { data: userData, offset: offset },
    });
  };
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <>
      <UserTable
        thead={thead}
        pageFor={"user"}
        className={"border"}
        maxHeight={"45rem"}
        searchTerm={searchTerm}
        handleInputSearch={handleInputSearch}
      >
        <RowTable
          isError={isError}
          isPending={isPending}
          ifEmpty={"Upsss !! data tidak tersedia..."}
          data={filteredData}
          totalRow={3}
          totalCol={8}
          renderItem={(data, index) => {
            return (
              <tr
                onClick={() => onNavigate(data)}
                className="text-nowrap cursor-pointer"
                key={index}
              >
                {/* <td>{data?.user_id}</td> */}
                <td>{index + 1}</td>
                <td>{data?.nisn}</td>
                <td>{data?.student_name}</td>
                <td>{data?.student_gender}</td>
              </tr>
            );
          }}
        />
      </UserTable>
    </>
  );
}
