import React, { useEffect, useState } from "react";
import RowTable from "../../components/UI/Table/RowTable";
import ScoresContainer from "./ScoresContainer";
import { theadAllScores } from "../../utils/dataObj";
import Tranparent from "../../components/UI/Button/Tranparent";
import CustomModal from "../../components/UI/Modal/Modal";
import axios from "axios";
import useForm from "../../components/Hooks/UseForm";
import Button from "../../components/UI/Button/Button";
import {
  dataScore,
  validateScoreForm,
  validateScoreIsChanges,
} from "../../utils/validation";
import { toast } from "react-toastify";

export default function ScoresPage() {
  const [editedData, setEditedData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [offset, setOffset] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [dataReport, setDataReport] = useState([]);

  const initState = {
    offset: null,
    loadingEdit: false,
  };

  const { form, setForm, handleInput, loading, setLoading, handleChange } =
    useForm(initState);

  const handleModal = (data, offset) => {
    setEditedData(data);
    setOffset(offset);
    setForm({
      user_id: data.user_id, // Ensure these fields are correctly set
      health_score: data.health_score,
      interview_score: data.interview_score,
      id: data.id,
    });
    setEditModal(true);
  };

  // const fetchData = async () => {
  //   try {
  //     // Fetch final scores
  //     const resScore = await axios.get(
  //       "http://localhost:3000/api/v1/finalScore"
  //     );
  //     const finalScores = resScore.data?.data ?? [];
  //     console.log("API Response:", resScore.data);

  //     // Fetch student data
  //     const response = await axios.get(
  //       "http://localhost:3000/api/v1/studentData"
  //     );
  //     const studentData = response.data.data?.allStudentData ?? [];
  //     const reportScores = response.data.data?.allReportScore ?? [];

  //     console.log("API Response:", response.data);

  //     // Combine student data with report scores and final scores
  //     const combinedData = studentData.map((student) => {
  //       const reportScore = reportScores.find(
  //         (report) => report.user_id === student.user_id
  //       );
  //       const finalScore = finalScores.find(
  //         (score) => score.user_id === student.user_id
  //       );
  //       return {
  //         ...student,
  //         total_report_score: reportScore?.total_report_score ?? 0,
  //         health_score: finalScore?.health_score ?? 0,
  //         interview_score: finalScore?.interview_score ?? 0,
  //         average_final_score: finalScore?.average_final_score ?? 0,
  //         id: student.user_id,
  //       };
  //     });

  //     setData(combinedData); // Update state with combined data
  //     console.log("Combined Data:", combinedData);
  //     setIsPending(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsError(true);
  //     setIsPending(false);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     // Fetch final scores
  //     const resScore = await axios.get(
  //       "http://localhost:3000/api/v1/finalScore"
  //     );
  //     const finalScores = resScore.data?.data ?? [];
  //     console.log("API Response:", resScore.data);

  //     // Fetch student data
  //     const response = await axios.get(
  //       "http://localhost:3000/api/v1/studentData"
  //     );
  //     const studentData = response.data.data?.allStudentData ?? [];
  //     const reportScores = response.data.data?.allReportScore ?? [];
  //     console.log("Report Scoree", reportScores);

  //     console.log("API Response:", response.data);

  //     // Combine student data with report scores and final scores
  //     const combinedData = studentData.map((student) => {
  //       const reportScore = reportScores.find(
  //         (report) => report.user_id === student.user_id
  //       );
  //       const finalScore = finalScores.find(
  //         (score) => score.user_id === student.user_id
  //       );
  //       console.log("Final scoree ", finalScore);
  //       return {
  //         ...student,
  //         total_report_score: reportScore?.total_report_score ?? 0,
  //         health_score: finalScore?.health_score ?? 0,
  //         interview_score: finalScore?.interview_score ?? 0,
  //         average_final_score: finalScore?.average_final_score ?? 0,
  //         id: student.user_id,
  //       };
  //     });

  //     setData(combinedData); // Update state with combined data
  //     console.log("Combined Data:", combinedData);
  //     setIsPending(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsError(true);
  //     setIsPending(false);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     // Fetch final scores
  //     const resScore = await axios.get(
  //       "http://localhost:3000/api/v1/finalScore"
  //     );
  //     const finalScores = resScore.data?.data ?? [];
  //     console.log("API Response:", resScore.data);

  //     // Fetch student data
  //     const response = await axios.get(
  //       "http://localhost:3000/api/v1/studentData"
  //     );
  //     const studentData = response.data.data?.allStudentData ?? [];
  //     const reportScores = response.data.data?.allReportScore ?? [];
  //     console.log("Report Scoree", reportScores);

  //     console.log("API Response:", response.data);

  //     // Combine student data with report scores and final scores
  //     const combinedData = studentData.map((student) => {
  //       const reportScore = reportScores.find(
  //         (report) => report.user_id === student.user_id
  //       );
  //       const finalScore = finalScores.find(
  //         (score) => score.user_id === student.user_id
  //       );

  //       // Calculate average_final_score based on backend logic
  //       const totalReportScore = reportScore?.total_report_score ?? 0;
  //       const healthScore = finalScore?.health_score ?? 0;
  //       const interviewScore = finalScore?.interview_score ?? 0;
  //       const averageFinalScore =
  //         (healthScore + interviewScore + totalReportScore) / 2;

  //       console.log("Final scoree ", finalScore);

  //       return {
  //         ...student,
  //         total_report_score: totalReportScore,
  //         health_score: healthScore,
  //         interview_score: interviewScore,
  //         average_final_score: averageFinalScore, // Calculate here
  //         id: student.user_id,
  //       };
  //     });

  //     setData(combinedData); // Update state with combined data
  //     console.log("Combined Data:", combinedData);
  //     setIsPending(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsError(true);
  //     setIsPending(false);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     // Fetch final scores
  //     const resScore = await axios.get(
  //       "http://localhost:3000/api/v1/finalScore"
  //     );
  //     const finalScores = resScore.data?.data ?? [];
  //     console.log("Final Scores:", finalScores);

  //     // Fetch student data
  //     const response = await axios.get(
  //       "http://localhost:3000/api/v1/studentData"
  //     );
  //     const studentData = response.data.data?.allStudentData ?? [];
  //     const reportScores = response.data.data?.allReportScore ?? [];
  //     console.log("Student Data:", studentData);
  //     console.log("Report Scores:", reportScores);

  //     // Combine student data with report scores and final scores
  //     const combinedData = studentData.map((student) => {
  //       const reportScore = reportScores.find(
  //         (report) => report.user_id === student.user_id
  //       );
  //       const finalScore = finalScores.find(
  //         (score) => score.user_id === student.user_id
  //       );

  //       // Log all values used in the calculation
  //       const totalReportScore = reportScore?.total_report_score ?? 0;
  //       const healthScore = finalScore?.health_score ?? 0;
  //       const interviewScore = finalScore?.interview_score ?? 0;
  //       const average_final_score =
  //         (healthScore + interviewScore + totalReportScore) / 2;

  //       console.log("Report Score:", reportScore);
  //       console.log("Final Score:", finalScore);
  //       // console.log("Calculated Average Final Score:", averageFinalScore);

  //       return {
  //         ...student,
  //         total_report_score: totalReportScore,
  //         health_score: healthScore,
  //         interview_score: interviewScore,
  //         average_final_score: average_final_score,
  //         id: student.user_id,
  //       };
  //     });

  //     setData(combinedData); // Update state with combined data
  //     console.log("Combined Data:", combinedData);
  //     setIsPending(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsError(true);
  //     setIsPending(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      // Fetch final scores
      const resScore = await axios.get(
        "http://localhost:3000/api/v1/finalScore"
      );
      const finalScores = resScore.data?.data ?? [];
      console.log("Final Scores API Response:", resScore.data);

      // Fetch student data
      const response = await axios.get(
        "http://localhost:3000/api/v1/studentData"
      );
      const studentData = response.data.data?.allStudentData ?? [];
      const reportScores = response.data.data?.allReportScore ?? [];

      console.log("Student Data API Response:", response.data);

      // Combine student data with report scores and final scores
      const combinedData = studentData.map((student) => {
        const reportScore = reportScores.find(
          (report) => report.user_id === student.user_id
        );
        const finalScore = finalScores.find(
          (score) => score.user_id === student.user_id
        );

        const total_report_score = reportScore?.total_report_score ?? 0;
        const health_score = finalScore?.health_score ?? 0;
        const interview_score = finalScore?.interview_score ?? 0;
        const average_final_score = finalScore?.average_final_score ?? 0;

        // Log the scores
        console.log(`Student ID: ${student.user_id}`);
        console.log(`Total Report Score: ${total_report_score}`);
        console.log(`Health Score: ${health_score}`);
        console.log(`Interview Score: ${interview_score}`);
        console.log(`Average Final Score: ${average_final_score}`);

        return {
          ...student,
          total_report_score,
          health_score,
          interview_score,
          average_final_score,
          id: student.user_id,
        };
      });

      setData(combinedData); // Update state with combined data
      console.log("Combined Data:", combinedData);
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

  // const handleUpdateData = async (data) => {
  //   if (!data || !data.id) {
  //     console.error("Invalid data:", data);
  //     toast.error("Data ID is missing.");
  //     return;
  //   }

  //   setLoading(true);
  //   const formData = dataScore(data); // Format data sesuai kebutuhan
  //   console.log("Form Data:", formData);

  //   try {
  //     const res = await axios.patch(
  //       `http://localhost:3000/api/v1/finalScore/update/${data.id}`, // Pastikan URL benar
  //       formData
  //     );
  //     if (res.status === 200) {
  //       console.log(res.data);
  //       fetchData(); // Refresh data setelah pembaruan berhasil
  //       toast.success("Anda berhasil mengubah criteria", { delay: 800 });
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error updating data:",
  //       error.response?.data || error.message
  //     );
  //     toast.error("Anda gagal mengubah criteria", { delay: 800 });
  //   } finally {
  //     setEditModal(false);
  //     setLoading(false);
  //   }
  // };

  const handleUpdateData = async (data) => {
    if (!data || !data.id) {
      console.error("Data tidak valid:", data);
      toast.error("ID Data hilang.");
      return;
    }

    setLoading(true);
    const formData = dataScore(data); // Pastikan ini memformat data dengan benar
    console.log("Form Data:", formData);

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/finalScore/update/${data.id}`, // Pastikan URL benar
        formData
      );
      if (res.status === 200) {
        console.log("Data Terbaru:", res.data);
        fetchData(); // Refresh data setelah pembaruan berhasil
        toast.success("Anda berhasil mengubah kriteria", { delay: 800 });
      }
    } catch (error) {
      console.error(
        "Kesalahan saat memperbarui data:",
        error.response?.data || error.message
      );
      toast.error("Anda gagal mengubah kriteria", { delay: 800 });
    } finally {
      setEditModal(false);
      setLoading(false);
    }
  };

  return (
    <>
      <ScoresContainer
        className={"border"}
        thead={theadAllScores}
        setAddModal={setAddModal}
      >
        <RowTable
          data={data}
          ifEmpty={"Tidak ada data kriteria!"}
          totalRow={5}
          totalCol={10}
          renderItem={(data, index, offset) => {
            return (
              <tr
                onClick={() => handleModal(data, offset)}
                data-bs-toggle="modal"
                data-bs-target="#medicineModal"
                className="text-nowrap cursor-pointer"
                key={data?.id}
              >
                <td>{data?.student_name}</td>
                <td>{data?.total_report_score}</td>
                <td>{data?.health_score}</td>
                <td>{data?.interview_score}</td>
                <td>{data?.average_final_score}</td>
              </tr>
            );
          }}
        />
      </ScoresContainer>
      {editModal && (
        <ScoresModal
          title={"Informasi Nilai"}
          data={editedData}
          offset={offset}
          form={form}
          handleAction={handleUpdateData}
          setEditModal={setEditModal}
        />
      )}
      {addModal && (
        <ScoresModal
          offset={offset}
          title={"Tambah Nilai"}
          handleInput={handleInput}
          setForm={setForm}
          data={form}
          forModal={"post"}
          setEditModal={setAddModal}
        />
      )}
    </>
  );
}

// const ScoresModal = ({
//   title,
//   data,
//   setEditModal,
//   forModal,
//   loading,
//   handleAction,
//   handleDelete,
//   offset,
// }) => {
//   const initState = {
//     id: data?.id ?? "",
//     health_score: data?.health_score ?? "",
//     interview_score: data?.interview_score ?? "",
//   };
//   const errorState = {
//     health_score: "",
//     interview_score: "",
//   };
//   const [isFormChanged, setIsFormChanged] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState(false);

//   const { form, setForm, handleInput, handleChange, errors, setErrors } =
//     useForm(initState, errorState);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateScoreForm(form, setErrors)) {
//       handleAction(form);
//     }
//   };

//   useEffect(() => {
//     const isChanged = validateScoreIsChanges(form, data);
//     setIsFormChanged(isChanged);
//   }, [form, data]);

//   const handleDeleteAction = () => {
//     handleDelete(data?.id, offset);
//     setDeleteConfirm(false);
//   };

//   return (
//     <>
//       {deleteConfirm && (
//         <Tranparent disabled={true} style={{ zIndex: 55 }}>
//           <CustomModal
//             title={"Hapus Kriteria?"}
//             content={
//               "Apabila anda menghapus Criteria, data keseluruhan criteria akan hilang"
//             }
//             confirmAction={handleDeleteAction}
//             cancelAction={() => setDeleteConfirm(false)}
//           />
//         </Tranparent>
//       )}

//       <div
//         className="modal-backdrop"
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.25)",
//           zIndex: "50",
//         }}
//       ></div>
//       <div
//         className="modal"
//         tabIndex="-1"
//         role="dialog"
//         aria-hidden="true"
//         style={{ display: "block", zIndex: "51" }}
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content rounded-4 border-0">
//             <div className="modal-header">
//               <h1 className="modal-title fs-2">{title}</h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={() => setEditModal(false)}
//               />
//             </div>
//             <div className="modal-body px-5">
//               <form>
//                 <div className="mb-3 row">
//                   <label
//                     htmlFor="health_score"
//                     className="col-sm-3 col-form-label "
//                   >
//                     Nilai Kesehatan
//                   </label>
//                   <div className="col-sm-9">
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="health_score"
//                       name="health_score"
//                       value={form.health_score}
//                       onChange={handleInput}
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3 row">
//                   <label
//                     htmlFor="interview_score"
//                     className="col-sm-3 col-form-label"
//                   >
//                     Nilai Interview
//                   </label>
//                   <div className="col-sm-9">
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="interview_score"
//                       name="interview_score"
//                       value={form.interview_score}
//                       onChange={handleInput}
//                     />
//                   </div>
//                 </div>
//               </form>
//             </div>

//             <div className="modal-footer">
//               <div className="d-flex flex-row gap-3 justify-content-start w-100 align-items-center">
//                 <Button
//                   disabled={!isFormChanged || loading}
//                   onClick={handleSubmit}
//                   style={{ width: "7.125rem" }}
//                   className={"btn-primary text-white fw-semibold"}
//                 >
//                   {loading ? <SpinnerSM /> : "Simpan"}
//                 </Button>
//                 {forModal === "post" ? null : (
//                   <Button
//                     type="button"
//                     onClick={() => setDeleteConfirm(true)}
//                     className="btn-outline-primary fw-semibold border-2 text-nowrap"
//                   >
//                     Hapus
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const ScoresModal = ({
  title,
  data,
  setEditModal,
  forModal,
  loading,
  handleAction,
  handleDelete,
  offset,
}) => {
  const initState = {
    id: data?.id ?? "",
    health_score: data?.health_score ?? "",
    interview_score: data?.interview_score ?? "",
  };
  const errorState = {
    health_score: "",
    interview_score: "",
  };
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { form, setForm, handleInput, handleChange, errors, setErrors } =
    useForm(initState, errorState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateScoreForm(form, setErrors)) {
      handleAction(form);
    }
  };

  useEffect(() => {
    const isChanged = validateScoreIsChanges(form, data);
    setIsFormChanged(isChanged);
  }, [form, data]);

  const handleDeleteAction = () => {
    handleDelete(data?.id, offset);
    setDeleteConfirm(false);
  };

  return (
    <>
      {deleteConfirm && (
        <Tranparent disabled={true} style={{ zIndex: 55 }}>
          <CustomModal
            title={"Hapus Kriteria?"}
            content={
              "Apabila anda menghapus Criteria, data keseluruhan criteria akan hilang"
            }
            confirmAction={handleDeleteAction}
            cancelAction={() => setDeleteConfirm(false)}
          />
        </Tranparent>
      )}

      <div
        className="modal-backdrop"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          zIndex: "50",
        }}
      ></div>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "block", zIndex: "51" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0">
            <div className="modal-header">
              <h1 className="modal-title fs-2">{title}</h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditModal(false)}
              />
            </div>
            <div className="modal-body px-5">
              <form>
                <div className="mb-3 row">
                  <label
                    htmlFor="health_score"
                    className="col-sm-3 col-form-label "
                  >
                    Nilai Kesehatan
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      id="health_score"
                      name="health_score"
                      value={form.health_score}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="interview_score"
                    className="col-sm-3 col-form-label"
                  >
                    Nilai Interview
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      id="interview_score"
                      name="interview_score"
                      value={form.interview_score}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <div className="d-flex flex-row gap-3 justify-content-start w-100 align-items-center">
                <Button
                  disabled={!isFormChanged || loading}
                  onClick={handleSubmit}
                  style={{ width: "7.125rem" }}
                  className={"btn-primary text-white fw-semibold"}
                >
                  {loading ? <SpinnerSM /> : "Simpan"}
                </Button>
                {forModal === "post" ? null : (
                  <Button
                    type="button"
                    onClick={() => setDeleteConfirm(true)}
                    className="btn-outline-primary fw-semibold border-2 text-nowrap"
                  >
                    Hapus
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
