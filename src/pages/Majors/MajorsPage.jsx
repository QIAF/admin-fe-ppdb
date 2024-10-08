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
import Cookies from "js-cookie";
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
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const { form, setForm, handleInput } = useForm(initState);

  const handleModal = (data, offset) => {
    setEditedData(data);
    setOffset(offset);
    setForm(data);
    setEditModal(true);
  };

  const parseImageURL = (imageString) => {
    try {
      // Jika imageString bukan objek JSON yang valid, kita bisa menanganinya secara berbeda.
      if (imageString.startsWith("{") && imageString.endsWith("}")) {
        // Menghapus tanda kurung kurawal di sekitar string
        imageString = imageString.slice(1, -1);
      }

      // Menghapus tanda kutip jika ada
      imageString = imageString.replace(/"/g, "");

      return imageString;
    } catch (e) {
      console.error("Error parsing image URL:", e);
      return null;
    }
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://be-ppdb-online-update.vercel.app/api/v1/major"
      );
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

  const token = Cookies.get("token");
  console.log("Token untuk article:", token);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const handlePost = async (data) => {
    setLoading(true);
    const formData = dataMajor(data);
    console.log("Form Data to be sent:", formData);

    try {
      const res = await axios.post(
        `https://be-ppdb-online-update.vercel.app/api/v1/major/create`,
        formData,
        config
      );
      console.log("Response:", res);
      if (res.status === 201) {
        fetchData();
        toast.success("Anda berhasil menambahkan data", { delay: 800 });
      } else {
        toast.error("Terjadi kesalahan saat menambahkan data", {
          delay: 800,
        });
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      toast.error("Anda gagal menambahkan data", { delay: 800 });
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
        `https://be-ppdb-online-update.vercel.app/api/v1/major/update/${data.id}`, // Pastikan URL benar
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

  const handleDelete = async (id) => {
    try {
      // Coba panggil endpoint API untuk menghapus item
      const res = await axios.delete(
        `https://be-ppdb-online-update.vercel.app/api/v1/major/delete/${id}`,
        config
      );

      // Cek respon dari server
      if (res.status === 200) {
        // Jika berhasil, filter data dan perbarui state
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        toast.success("Data berhasil dihapus");
        setEditModal(false);

        // Log untuk memastikan penghapusan berhasil
        console.log("Article successfully deleted.");
      } else {
        // Tangani respon yang tidak berhasil
        console.error(
          "Failed to delete the article. Server responded with status:",
          res.status
        );
        alert("Gagal menghapus artikel. Silakan coba lagi.");
      }
    } catch (error) {
      // Tangani kesalahan jaringan atau kesalahan lainnya
      if (error.response) {
        // Server merespons dengan status selain 2xx
        console.error("Error deleting the article:", error.response.data);
        alert(
          `Gagal menghapus artikel: ${
            error.response.data.message || "Silakan coba lagi."
          }`
        );
      } else if (error.request) {
        // Tidak ada respon dari server
        console.error("No response received:", error.request);
        alert("Tidak ada respon dari server. Silakan coba lagi.");
      } else {
        // Kesalahan lain
        console.error("Error deleting the article:", error.message);
        alert("Terjadi kesalahan saat menghapus artikel. Silakan coba lagi.");
      }
    }
  };
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;
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
          ifEmpty={"Upsss !! tidak ada data"}
          totalRow={3}
          totalCol={5}
          renderItem={(data, index, offset) => {
            console.log("Rendering item:", data); // Log entire data object
            const imageUrl = data?.major_picture
              ? parseImageURL(data.major_picture)
              : null;

            return (
              <tr
                className="text-wrap cursor-pointer"
                onClick={() => handleModal(data, offset)}
                data-bs-toggle="modal"
                key={data?.id}
              >
                <td
                  style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
                >
                  {data?.major_name}
                </td>
                <td>{data?.major_description}</td>
                <td>
                  {data?.major_picture ? (
                    <img
                      src={imageUrl}
                      alt={imageUrl}
                      width={100}
                      height="auto"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
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
          handleDelete={handleDelete}
          handleAction={handleEditData}
          setEditModal={setEditModal}
          loading={loading}
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
          loading={loading}
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
  handleAction,
  handleDelete,
  offset,
  loading,
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
            title={"Hapus Bidang Keahlian?"}
            content={
              "Apabila anda menghapus data, data keseluruhan data akan hilang"
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
                    <textarea
                      className="form-control"
                      name="major_description"
                      value={form.major_description}
                      onChange={handleInputChange}
                      maxLength={1000} // Sesuaikan dengan panjang maksimum yang diinginkan
                      rows="5" // Sesuaikan dengan jumlah baris yang diinginkan
                    />
                    {/* <ErrMsg msg={errors.name} /> */}
                  </div>
                </div>
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
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <div className="d-flex flex-row gap-3 justify-content-start w-100 align-items-center">
                <Button
                  disabled={!isFormChanged || loading} // Gunakan loading untuk menonaktifkan tombol saat submit
                  onClick={handleSubmit}
                  style={{ width: "7.125rem" }}
                  className={"btn-primary text-white fw-semibold"}
                >
                  {loading ? (
                    <div className="d-flex align-items-center">
                      <Spinner /> {/* Komponen Spinner */}
                      <span className="ms-2">Loading...</span>
                    </div>
                  ) : (
                    "Simpan"
                  )}
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
