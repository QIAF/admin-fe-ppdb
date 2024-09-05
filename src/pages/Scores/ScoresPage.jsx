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
  dataStudent,
  validateScoreForm,
  validateScoreIsChanges,
} from "../../utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Loader/Spinner";
import { Input } from "../../components/UI/Input/Input";
import { ErrMsg } from "../../components/Error/ErrMsg";
import Cookies from "js-cookie";

export default function ScoresPage() {
  const [editedData, setEditedData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [offset, setOffset] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      // user_id: data.user_id, // Ensure these fields are correctly set
      health_score: data.health_score,
      interview_score: data.interview_score,
      final_result: data.final_result,
      major_result: data.major_result,
      result_description: data.result_description,
      id: data.id,
    });
    setEditModal(true);
  };
  const token = Cookies.get("token");
  console.log("Token untuk article:", token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://be-ppdb-online-update.vercel.app/api/v1/studentData`,
        config
      );
      const studentData = response.data.data?.allStudentData ?? [];
      const reportScores = response.data.data?.allReportScore ?? [];
      const finalScores = response.data.data?.allFinalScore ?? [];

      const combinedData = studentData.map((student) => {
        const reportScore = reportScores.find(
          (report) => report.id === student.id
        );
        const finalScore = finalScores.find((score) => score.id === student.id);

        return {
          ...student,
          total_report_score: reportScore?.total_report_score ?? 0,
          health_score: finalScore?.health_score ?? 0,
          interview_score: finalScore?.interview_score ?? 0,
          average_final_score: finalScore?.average_final_score ?? 0,
          final_result: finalScore?.final_result ?? 0,
          major_result: finalScore?.major_result ?? 0,
          result_description: finalScore?.result_description ?? 0,
          id: student.id,
        };
      });

      const sortedData = combinedData.sort(
        (a, b) => b.average_final_score - a.average_final_score
      );

      // Assign ranks based on sorted data
      const rankedData = sortedData.map((item, index) => ({
        ...item,
        Hasil: index + 1, // Assign rank starting from 1
      }));

      setData(rankedData); // Update state with ranked data
      setFilteredData(rankedData);
    } catch (error) {
      console.error("Error saat mengambil data:", error);
      setIsError(true);
    } finally {
      setIsPending(false); // Pastikan status pending diperbarui terlepas dari berhasil atau gagal
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = data.filter(
      (item) =>
        item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.major_result)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredItems);
  }, [searchTerm, data]);

  const handleInputSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
        `https://be-ppdb-online-update.vercel.app/api/v1/finalScore/update/${data.id}`, // Pastikan URL benar
        formData,
        config
      );
      if (res.status === 200) {
        console.log("Data Terbaru:", res.data);
        fetchData(); // Refresh data setelah pembaruan berhasil
        toast.success("Anda berhasil mengubah nilai", { delay: 800 });
      }
    } catch (error) {
      console.error(
        "Kesalahan saat memperbarui data:",
        error.response?.data || error.message
      );
      toast.error("Anda gagal mengubah nilai", { delay: 800 });
    } finally {
      setEditModal(false);
      setLoading(false);
    }
  };
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;
  return (
    <>
      <ScoresContainer
        className={"border"}
        thead={theadAllScores}
        setAddModal={setAddModal}
        searchTerm={searchTerm}
        handleInputSearch={handleInputSearch}
      >
        <RowTable
          data={filteredData}
          ifEmpty={"Tidak ada daftar nilai"}
          totalRow={5}
          totalCol={10}
          renderItem={(data, index, offset) => {
            return (
              <tr
                onClick={() => handleModal(data, offset)}
                data-bs-toggle="modal"
                // data-bs-target="#medicineModal"
                className="text-nowrap cursor-pointer"
                key={data?.id}
              >
                <td>{data?.Hasil}</td>
                <td>{data?.student_name}</td>
                <td>{data?.total_report_score}</td>
                <td>{data?.health_score}</td>
                <td>{data?.interview_score}</td>
                <td>{data?.average_final_score}</td>
                <td>{data?.final_result}</td>
                <td>{data?.major_result}</td>
                <td>{data?.result_description}</td>

                <td></td>
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
const ScoresModal = ({
  title,
  data,
  setEditModal,

  loading,
  handleAction,
}) => {
  const initState = {
    id: data?.id ?? "",
    health_score: data?.health_score ?? "",
    interview_score: data?.interview_score ?? "",
    final_result: data?.final_result ?? "",
    major_result: data?.major_result ?? "",
    result_description: data?.result_description ?? "",
  };
  const errorState = {
    health_score: "",
    interview_score: "",
    // final_result: "",
    // major_result: "",
    // result_description: "",
  };
  const [isFormChanged, setIsFormChanged] = useState(false);

  const { form, setForm, handleChange, errors, setErrors } = useForm(
    initState,
    errorState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateScoreForm(form, setErrors)) {
      handleAction(form);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Menjaga nilai total_report_score tetap ada
    }));
  };

  useEffect(() => {
    const isChanged = validateScoreIsChanges(form, data);
    setIsFormChanged(isChanged);
  }, [form, data]);

  return (
    <>
      <div
        className="modal-backdrop"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          zIndex: "50",
        }}
      ></div>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        // aria-hidden="true"
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
                    <ErrMsg msg={errors.health_score} />
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
                    <Input
                      type="number"
                      className="form-control"
                      id="interview_score"
                      name="interview_score"
                      value={form.interview_score}
                      onChange={handleInput}
                    />
                    <ErrMsg msg={errors.interview_score} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="student_gender"
                    className="col col-form-label"
                    placeholder="fghjk"
                  >
                    Hasil akhir
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="final_result"
                      name="final_result"
                      value={form.final_result} // Menyinkronkan nilai select dengan formData
                      onChange={handleInput} // Memperbarui formData saat pilihan berubah
                    >
                      <option value="">Pilih Hasil</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Dipertimbangkan">Dipertimbangkan</option>
                      <option value="Tidak diterima">Tidak Diterima</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="student_gender"
                    className="col col-form-label"
                    placeholder="fghjk"
                  >
                    Bidang Keahlian
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="major_result"
                      name="major_result"
                      value={form.major_result}
                      onChange={handleInput}
                    >
                      <option value="">Pilihan pertama</option>
                      <option value="-">-</option>
                      <option value="Teknik Kendaraan">Teknik Kendaraan</option>
                      <option value="Teknik Elektronika">
                        Teknik Elektronika
                      </option>
                      <option value="Teknik Ketenagalistrikan">
                        Teknik Ketenagalistrikan
                      </option>
                      <option value="Teknik Komputer Dan Jaringan">
                        Teknik Komputer Dan Jaringan
                      </option>
                      <option value="Teknik Sepeda Motor">
                        Teknik Sepeda Motor
                      </option>
                      <option value="Desain Permodelan Dan Informasi Bangunan">
                        Desain Permodelan Dan Informasi Bangunan
                      </option>
                      <option value="Teknologi Farmasi">
                        Teknologi Farmasi
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="result_description"
                    className="col-sm-3 col-form-label"
                  >
                    Deskripsi
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      className="form-control"
                      id="result_description"
                      name="result_description"
                      value={form.result_description}
                      onChange={handleInput}
                    />
                    <ErrMsg msg={errors.result_description} />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <div className="d-flex flex-row gap-3 justify-content-center w-100 align-items-center">
                <Button
                  disabled={!isFormChanged || loading}
                  onClick={handleSubmit}
                  style={{ width: "7.125rem" }}
                  className={"btn-primary text-white fw-semibold"}
                >
                  {loading ? <Spinner /> : "Simpan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
