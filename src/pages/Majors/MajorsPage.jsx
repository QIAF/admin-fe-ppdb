import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Tranparent from "../../components/UI/Button/Tranparent";
import { theadAllMajors } from "../../utils/dataObj";
import RowTable from "../../components/UI/Table/RowTable";
import axios from "axios";
import MajorsContainer from "./MajorsContainer";
import {
  dataMajor,
  validateMajor,
  validateMajorIsChanges,
} from "../../utils/validation";
import { toast } from "react-toastify";
import CustomModal from "../../components/UI/Modal/Modal";
import useForm from "../../components/Hooks/UseForm";
import Spinner from "../../components/Loader/Spinner";

const initState = {
  offset: null,
  loadingEdit: false,
};

export default function MajorsPage() {
  const [editedData, setEditedData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(null);
  const [error, setIsError] = useState();
  const [isPending, setIsPending] = useState();

  const { form, setForm, handleInput, loading, setLoading, handleChange } =
    useForm(initState);

  const handleModal = (data, offset) => {
    setEditedData(data);
    setOffset(offset);
    setForm(data);
    setEditModal(true);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/major");
      console.log("API Response:", res.data);
      setData(res.data.data); // Asumsi data berada di dalam results
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
  const parseImageURL = (imageString) => {
    try {
      // Log raw imageString
      console.log("Raw imageString:", imageString);

      // Parse JSON string
      const imageObject = JSON.parse(imageString);
      console.log("Parsed imageObject:", imageObject);

      // Extract URL from object keys
      const imageUrl = Object.keys(imageObject)[0];
      console.log("Extracted image URL:", imageUrl);

      return imageUrl;
    } catch (e) {
      console.error("Error parsing image URL:", e);
      return null;
    }
  };
  const handlePost = async (data) => {
    setLoading(true);
    const formData = dataMajor(data);
    console.log("Form Data to be sent:", formData);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/major/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response:", res);
      if (res.status === 201) {
        fetchData();
        toast.success("Anda berhasil menambahkan criteria", { delay: 800 });
      } else {
        toast.error("Terjadi kesalahan saat menambahkan criteria", {
          delay: 800,
        });
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      toast.error("Anda gagal menambahkan criteria", { delay: 800 });
      console.error("Error:", error);
    } finally {
      setAddModal(false);
      setLoading(false);
    }
  };

  const handleEditData = async (data) => {
    setLoading(true);
    const formData = dataMajor(data);
    console.log("Form Data to be sent:", formData);

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/major/update/${data.id}`, // Pastikan URL benar
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
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

  return (
    <>
      <MajorsContainer
        thead={theadAllMajors}
        className={"border"}
        setAddModal={setAddModal}
        // maxHeight={"45rem"}
      >
        <RowTable
          data={data}
          ifEmpty={"Tidak ada data Riwayat Pemilihan!"}
          totalRow={3}
          totalCol={5}
          renderItem={(data, index, offset) => {
            console.log("Rendering item:", data); // Log entire data object
            const imageUrl = parseImageURL(data?.major_picture); // Store parsed URL
            console.log("Image URL for data ID", data?.id, ":", imageUrl);

            return (
              <tr
                onClick={() => handleModal(data, offset)}
                data-bs-toggle="modal"
                className="text-nowrap cursor-pointer"
                key={data?.id}
              >
                <td>{data?.major_name}</td>
                <td>{data?.major_description}</td>
                <td>
                  {data?.major_picture ? (
                    <img
                      src={parseImageURL(data?.major_picture)}
                      alt={data.major_name}
                      width={100}
                      height="auto"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
              </tr>
            );
          }}
        />
      </MajorsContainer>
      {editModal && (
        <MajorModal
          title={"Informasi Bidang Keahlian"}
          data={editedData}
          offset={form.offset}
          // handleDelete={handleDelete}
          handleAction={handleEditData}
          setEditModal={setEditModal}
        />
      )}
      {addModal && (
        <MajorModal
          offset={form.offset}
          title={"Tambah Criteria"}
          handleInput={handleInput}
          setForm={setForm}
          data={form}
          forModal={"post"}
          handleAction={handlePost}
          setEditModal={setAddModal}
        />
      )}
    </>
  );
}

const MajorModal = ({
  title,
  data,
  setEditModal,
  forModal,
  loading,
  handleAction,
  handleDelete,
  offset,
}) => {
  let initState = {
    id: data?.id ?? "",
    major_name: data?.major_name ?? "",
    major_description: data?.major_description ?? "",
    major_picture: data?.major_picture ?? "",
  };

  let errorState = {
    major_name: "",
    major_description: "",
    major_picture: "",
  };

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { form, setForm, handleInputChange, errors, setErrors } = useForm(
    initState,
    errorState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("next");
    if (validateMajor(form, setErrors)) {
      handleAction(form);
      console.log("masuk?");
    } else {
      console.log("ga masuk?");
    }
  };

  useEffect(() => {
    const isChanged = validateMajorIsChanges(form, data);
    console.log("isChanged:", isChanged);
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
                    htmlFor="major_name"
                    className="col-sm-3 col-form-label "
                  >
                    Nama Bidang Keahlian
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="major_name"
                      name="major_name"
                      value={form.major_name}
                      onChange={handleInputChange}
                    />
                    {/* <ErrMsg msg={errors.major_name} /> */}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="major_description"
                    className="col-sm-3 col-form-label"
                  >
                    Deskripsi
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="major_description"
                      name="major_description"
                      value={form.major_description}
                      onChange={handleInputChange}
                    />
                    {/* <ErrMsg msg={errors.name} /> */}
                  </div>
                </div>
                {/* <div className="mb-3 row">
                  <label
                    htmlFor="major_picture"
                    className="col-sm-3 col-form-label "
                  >
                    Gambar Bidang Keahlian
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="major_picture"
                      name="major_picture"
                      value={data.major_picture}
                      onChange={handleInput}
                    />
                    <ErrMsg msg={errors.major_picture} />
                  </div>
                </div> */}

                <div className="mb-3">
                  <label htmlFor="studentDocument" className="form-label">
                    Gambar Bidang Keahlian
                  </label>
                  <input
                    type={"file"}
                    id="major_picture"
                    name="major_picture"
                    className={"form-control"}
                    onChange={handleInputChange}
                  />
                  {/* <ErrMsg msg={error.studentDocument} /> */}
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
                  {loading ? <Spinner /> : "Simpan"}
                </Button>
                <Button
                  disabled={forModal === "post" || loading}
                  type="button"
                  onClick={() => setDeleteConfirm(true)}
                  className="btn-outline-primary fw-semibold border-2 text-nowrap"
                >
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
