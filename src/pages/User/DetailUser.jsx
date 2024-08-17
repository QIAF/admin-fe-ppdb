import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import noImage from "../../assets/images/image_not_available.png";
import { Link } from "react-router-dom";
import ImageWithFallback from "../../components/Error/ImageWithFallback";
import CustomModal from "../../components/UI/Modal/Modal";
import Tranparent from "../../components/UI/Button/Tranparent";
import backIcon from "../../assets/images/arrow-right.svg";
import Button from "../../components/UI/Button/Button";

export default function DetailUser() {
  const location = useLocation();
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  // const { data } = location.state;
  const data = location.state?.data;

  // const handleDelete = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await client.delete(`/admins/doctor/${data.id}`);
  //     if (res?.status === 200) {
  //       navigate("/doctors");
  //       toast.success("Anda berhasil menghapus dokter!", {
  //         delay: 800,
  //       });
  //     } else {
  //       throw new Error("Gagal menghapus data dokter!");
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.meta?.message, {
  //       delay: 800,
  //     });
  //   } finally {
  //     setModalDelete(false);
  //     setLoading(false);
  //   }
  // };
  return (
    <section className="container-fluid detail-container">
      <div className="d-flex flex-column mt-3 gap-3 ">
        <div className="d-flex flex-row align-items-center gap-3 ">
          <Link
            className="nav-link active p-0 text-body-secondary"
            to={"/users"}
          >
            <img
              src={backIcon}
              alt="Bootstrap"
              width={30}
              height={30}
              className="img-fluid"
            />
          </Link>
          <h3 className="fs-2 mb-0 fw-semibold" style={{ fontWeight: 700 }}>
            Detail Siswa
          </h3>
        </div>
        <div className="d-flex flex-row flex-wrap gap-3 align-items-start custom-margin-left">
          <ImageWithFallback
            src={noImage}
            fallback={noImage}
            alt="photo avatar"
            className="rounded-2 object-fit-cover "
            style={{ maxWidth: "13.75rem", maxHeight: "16.625rem" }}
          />
          <div className=" custom-margin-table">
            <table className="table">
              <tbody>
                <tr>
                  <td>Nama Lengkap</td>
                  <td>:</td>
                  <td>{data?.student_name}</td>
                </tr>
                <tr>
                  <td>NIK</td>
                  <td>:</td>
                  <td>{data?.family_card_number}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>:</td>
                  <td>{data?.student_gender}</td>
                </tr>
                <tr>
                  <td>Tempat Lahir</td>
                  <td>:</td>
                  <td>{data?.place_birth}</td>
                </tr>
                <tr>
                  <td>Tanggal Lahir</td>
                  <td>:</td>
                  <td>{data?.date_birth}</td>
                </tr>
                <tr>
                  <td>Alamat Asal</td>
                  <td>:</td>
                  <td>{data?.student_address}</td>
                </tr>
                <tr>
                  <td>Alamat Di Yogyakarta</td>
                  <td>:</td>
                  <td>{data?.student_address_now}</td>
                </tr>
                <tr>
                  <td>Jarak Rumah ke Sekolah</td>
                  <td>:</td>
                  <td>{data?.student_distance}</td>
                </tr>
                <tr>
                  <td>Agama</td>
                  <td>:</td>
                  <td>{data?.student_religion}</td>
                </tr>
                <tr>
                  <td>Golongan Darah</td>
                  <td>:</td>
                  <td>{data?.student_blood_type}</td>
                </tr>
                <tr>
                  <td>Tinggi / Berat Badan</td>
                  <td>:</td>
                  <td>
                    {data?.student_height} /{data?.student_weight}
                  </td>
                </tr>
                <tr>
                  <td>Anak Ke -</td>
                  <td>:</td>
                  <td>{data?.student_child}</td>
                </tr>
                <tr>
                  <td>KPS PKH/PIP/KMS Kota Yogyakarta</td>
                  <td>:</td>
                  <td>{data?.student_kps}</td>
                </tr>
                <tr>
                  <td>Hobi</td>
                  <td>:</td>
                  <td>{data?.student_hobby}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3 ">
          {/* <Link to={`/doctors/edit-doctor/${data?.id}`} state={data}> */}
          <Button className="btn-primary border-2 border-primary text-white fw-semibold px-4 ">
            Edit
          </Button>
          {/* </Link> */}
          <Button
            className="btn-trasparent border-2 border-primary text-primary fw-semibold px-3 "
            onClick={() => setModalDelete(true)}
          >
            Hapus
          </Button>
        </div>
      </div>

      {modalDelete && (
        <Tranparent
          disabled={true}
          className="min-vw-100 start-0 position-fixed end-0"
        >
          <CustomModal
            disabled={loading}
            title={"Hapus Dokter?"}
            content={
              "Apabila anda menghapus Dokter, maka data Dokter akan hilang"
            }
            confirmAction={handleDelete}
            cancelAction={() => setModalDelete(false)}
          />
        </Tranparent>
      )}
    </section>
  );
}
