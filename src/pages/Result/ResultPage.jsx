import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ResultContainer from "./ResultContainer";
import RowTable from "../../components/UI/Table/RowTable";
import { theadStudentPassed } from "../../utils/dataObj";
import Cookies from "js-cookie";

export default function ResultPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `https://be-ppdb-online-update.vercel.app/api/v1/finalScore/studentPassed`,
        config
      );
      console.log("API Response:", response.data);

      const studentData = response.data.data?.allStudentData ?? [];
      const finalScores = response.data.data?.allFinalScores ?? [];

      // Gabungkan data siswa dengan skor akhir
      const combinedData = studentData.map((student) => {
        const finalScore = finalScores.find((score) => score.id === student.id);

        return {
          ...student,
          final_result: finalScore?.final_result ?? "N/A",
          major_result: finalScore?.major_result ?? "N/A",
          id: student.id,
        };
      });

      // Mengatur data ke state
      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isPending) return <div className="center-screen">Loading...</div>;
  if (isError) return <div className="center-screen">Error fetching data.</div>;
  return (
    <>
      <ResultContainer
        className={"border"}
        thead={theadStudentPassed}
        searchTerm={searchTerm}
        handleInputSearch={(e) => setSearchTerm(e.target.value)}
      >
        <RowTable
          data={filteredData}
          ifEmpty={"Tidak ada daftar nilai"}
          totalRow={5}
          totalCol={10}
          renderItem={(data, index) => (
            <tr
              data-bs-toggle="modal"
              className="text-nowrap cursor-pointer"
              key={data?.id}
            >
              <td>{data?.nisn}</td>
              <td>{data?.student_name}</td>
              <td>{data?.final_result}</td>
              <td>{data?.major_result}</td>
            </tr>
          )}
        />
      </ResultContainer>
    </>
  );
}
