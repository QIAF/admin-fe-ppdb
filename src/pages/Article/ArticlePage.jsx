import React, { useEffect, useState } from "react";
import useForm from "../../components/Hooks/UseForm";
import ArticleContainer from "./ArticleContainer";
import { theadArticle } from "../../utils/dataObj";
import RowTable from "../../components/UI/Table/RowTable";
import axios from "axios";
import {
  dataArticle,
  validateArticle,
  validateArticleIsChanges,
} from "../../utils/validation";
import { toast } from "react-toastify";
import Tranparent from "../../components/UI/Button/Tranparent";
import CustomModal from "../../components/UI/Modal/Modal";
import { Input } from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/Loader/Spinner";
import "./article.css";

export default function ArticlePage() {
  const [editedData, setEditedData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(null);
  const [error, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

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
      id: data.id,
      article_name: data.article_name,
      article_description: data.article_description,
    });
    setEditModal(true);
  };

  const fetchData = async () => {
    setIsPending(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/article");
      setData(res.data.data);
      setIsPending(false);
    } catch (error) {
      setIsError(true);
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async (data) => {
    setLoading(true);
    const formData = dataArticle(data);
    console.log("Form Data to be sent:", formData);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/article/create`,
        formData
      );
      console.log("Response:", res);

      if (res.status === 200) {
        fetchData();
        toast.success("Anda berhasil menambahkan data", { delay: 400 });
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

  const handleUpdateData = async (data) => {
    if (!data || !data.id) {
      toast.error("ID Data hilang.");
      return;
    }

    setLoading(true);
    const formData = dataArticle(data);

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/article/update/${data.id}`,
        formData
      );
      if (res.status === 200) {
        fetchData();
        toast.success("Anda berhasil mengubah nilai", { delay: 800 });
      }
    } catch (error) {
      toast.error("Anda gagal mengubah nilai", { delay: 800 });
    } finally {
      setEditModal(false);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/article/delete/${id}`
      );
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
      toast.success("Data berhasil dihapus");
      setEditModal(false);

      // Tambahkan log untuk memastikan penghapusan berhasil
      console.log("Article successfully deleted.");
    } catch (error) {
      console.error("Error deleting the article:", error);
      alert("Terjadi kesalahan saat menghapus artikel. Silakan coba lagi.");
    }
  };

  return (
    <>
      <ArticleContainer
        thead={theadArticle}
        className={"border"}
        setAddModal={setAddModal}
      >
        <RowTable
          data={data}
          ifEmpty={"Upsss !! tidak ada data Pengumuman!"}
          totalRow={3}
          totalCol={8}
          renderItem={(data, index, offset) => (
            <tr
              className="text-wrap cursor-pointer"
              onClick={() => handleModal(data, offset)}
              key={data?.id}
            >
              <td>{index + 1}</td>
              <td>{data?.article_name}</td>
              <td>{data?.article_description}</td>
            </tr>
          )}
        />
      </ArticleContainer>
      {editModal && (
        <ArticleModal
          title={"Edit Pengumuman"}
          data={editedData}
          offset={form.offset}
          form={form}
          handleDelete={handleDelete}
          handleAction={handleUpdateData}
          setEditModal={setEditModal}
        />
      )}
      {addModal && (
        <ArticleModal
          offset={offset}
          title={"Tambah Pengumuman"}
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

const ArticleModal = ({
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
    article_name: data?.article_name ?? "",
    article_description: data?.article_description ?? "",
  };
  const errorState = {
    article_name: "",
    article_description: "",
  };
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { form, setForm, handleChange, errors, setErrors } = useForm(
    initState,
    errorState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateArticle(form, setErrors)) {
      console.log("Form data is valid. Submitting form...");
      handleAction(form);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isChanged = validateArticleIsChanges(form, data);
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
            title={"Hapus Pengumuman?"}
            content={
              "Apabila anda menghapus pengumuman, data keseluruhan pengumuman akan hilang"
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
                    htmlFor="article_name"
                    className="col-sm-3 col-form-label"
                  >
                    Judul
                    {!form.article_name && <span className="required">*</span>}
                  </label>
                  <div className="col-sm-9">
                    <Input
                      type="text"
                      className="form-control"
                      id="article_name"
                      name="article_name"
                      value={form.article_name}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="article_description"
                    className="col-sm-3 col-form-label"
                  >
                    Deskripsi
                    {!form.article_description && (
                      <span className="required">*</span>
                    )}
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      id="article_description"
                      name="article_description"
                      value={form.article_description}
                      onChange={handleInput}
                      maxLength={1000} // Sesuaikan dengan panjang maksimum yang diinginkan
                      rows="4" // Sesuaikan dengan jumlah baris yang diinginkan
                    />
                    <small className="form-text text-muted">
                      Maksimal {1000} karakter
                    </small>
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
                  {loading ? <Spinner /> : "Simpan"}
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
