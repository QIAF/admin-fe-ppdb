import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import noImage from "../../assets/images/image_not_available.png";
import { Link } from "react-router-dom";
import ImageWithFallback from "../../components/Error/ImageWithFallback";
import CustomModal from "../../components/UI/Modal/Modal";
import Tranparent from "../../components/UI/Button/Tranparent";
import backIcon from "../../assets/images/arrow-right.svg";
import Button from "../../components/UI/Button/Button";
import RowTable from "../../components/UI/Table/RowTable";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/validation";

export default function DetailUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = location.state?.data;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/studentData/delete/${data.id}`
      );
      navigate("/users");
      console.log("Data berhasil terhapus di API => ", res.data);
      toast.success("Data berhasil dihapus");
    } catch (error) {
      console.error("Ada Kesalahan dalam code", error);
      toast.error("Gagal menghapus data");
    }
  };
  return (
    <>
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
                    <td>Tempat Lahir, tanggal lahir</td>
                    <td>:</td>
                    <td>
                      {data?.place_birth}
                      {","} {formatDate(data?.date_birth)}
                    </td>
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

                  <tr>
                    <td>Nama Ayah</td>
                    <td>:</td>
                    <td>{data?.father_name}</td>
                  </tr>
                  <tr>
                    <td>Tempat, tanggal Lahir Ayah</td>
                    <td>:</td>
                    <td>
                      {data?.place_birth_father}
                      {", "}
                      {formatDate(data?.father_birth)}
                    </td>
                  </tr>
                  <tr>
                    <td>Pekerjaan Ayah / Pendapatan Perbulan</td>
                    <td>:</td>
                    <td>
                      {data?.father_job}/{data?.father_income}
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Ibu</td>
                    <td>:</td>
                    <td>{data?.mother_name}</td>
                  </tr>
                  <tr>
                    <td>Tempat, tanggal lahir ibu</td>
                    <td>:</td>
                    <td>
                      {data?.place_birth_mother}
                      {", "}
                      {formatDate(data?.mother_birth)}
                    </td>
                  </tr>
                  <tr>
                    <td>Pekerjaan Ibu / Pendapatan Perbulan</td>
                    <td>:</td>
                    <td>
                      {data?.mother_job}/{data?.mother_income}
                    </td>
                  </tr>
                  <tr>
                    <td>Nomor Telepon Rumah</td>
                    <td>:</td>
                    <td>{data?.phoneNumber_house}</td>
                  </tr>

                  <tr>
                    <td>Nama Wali</td>
                    <td>:</td>
                    <td>{data?.guardian_name}</td>
                  </tr>
                  <tr>
                    <td>Alamat Wali</td>
                    <td>:</td>
                    <td>{data?.guardian_address}</td>
                  </tr>
                  <tr>
                    <td>Nomor Telepon</td>
                    <td>:</td>
                    <td>{data?.guardian_phone}</td>
                  </tr>
                  <tr>
                    <td>Pekerjaan</td>
                    <td>:</td>
                    <td>{data?.guardian_job}</td>
                  </tr>
                  <tr>
                    <td>Nama Sekolah Asal</td>
                    <td>:</td>
                    <td>{data?.school_name}</td>
                  </tr>
                  <tr>
                    <td>Status Sekolah</td>
                    <td>:</td>
                    <td>{data?.school_status}</td>
                  </tr>
                  <tr>
                    <td>Alamat Sekolah Asal</td>
                    <td>:</td>
                    <td>{data?.school_address}</td>
                  </tr>
                  <tr>
                    <td>Nomor Ijazah</td>
                    <td>:</td>
                    <td>{data?.ijazah_number}</td>
                  </tr>
                  <tr>
                    <td>Pilihan Bidang Keahlian </td>
                    <td>:</td>
                    <td>
                      {data?.major_choice1} {"dan"} {data?.major_choice2}
                    </td>
                  </tr>
                  <tr>
                    <td>NISN</td>
                    <td>:</td>
                    <td>{data?.nisn}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: "2rem" }}></div>
              <table
                style={{ width: "100%" }}
                className="table table-borderless table-striped mt-3"
              >
                <thead className="m-auto text-center">
                  <tr>
                    <th rowSpan={2}>Mata Pelajaran</th>
                    <th colSpan={2}>Kelas 7</th>
                    <th colSpan={2}>Kelas 8</th>
                    <th>Kelas 9</th>
                  </tr>
                </thead>
                <tbody className="m-auto text-center">
                  <tr className="">
                    <td>Mata Pelajaran</td>
                    <td>Semester 1</td>
                    <td>Semester 2</td>
                    <td>Semester 3</td>
                    <td>Semester 4</td>
                    <td>Semester 5</td>
                  </tr>
                  <tr>
                    <td>Matematika</td>
                    <td>{data?.report?.mathematics1}</td>
                    <td>{data?.report?.mathematics2}</td>
                    <td>{data?.report?.mathematics3}</td>
                    <td>{data?.report?.mathematics4}</td>
                    <td>{data?.report?.mathematics5}</td>
                  </tr>
                  <tr>
                    <td>IPA</td>
                    <td>{data?.report?.science1}</td>
                    <td>{data?.report?.science2}</td>
                    <td>{data?.report?.science3}</td>
                    <td>{data?.report?.science4}</td>
                    <td>{data?.report?.science5}</td>
                  </tr>
                  <tr>
                    <td>Bahasa Indonesia</td>
                    <td>{data?.report?.indonesian1}</td>
                    <td>{data?.report?.indonesian2}</td>
                    <td>{data?.report?.indonesian3}</td>
                    <td>{data?.report?.indonesian4}</td>
                    <td>{data?.report?.indonesian5}</td>
                  </tr>
                  <tr>
                    <td>Bahasa Inggris</td>
                    <td>{data?.report?.english1}</td>
                    <td>{data?.report?.english2}</td>
                    <td>{data?.report?.english3}</td>
                    <td>{data?.report?.english4}</td>
                    <td>{data?.report?.english5}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Rata-Rata</b>
                    </td>
                    <td colSpan={5}>
                      <b>{data?.report?.total_report_score}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-center align-items-center gap-3 ">
            <Link to={`/users/updateUser/${data?.id}`} state={data}>
              <Button className="btn-primary border-2 border-primary text-white fw-semibold px-4 ">
                Edit
              </Button>
            </Link>
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
              title={"Hapus ?"}
              content={"Apabila anda menghapus dara, maka data akan hilang"}
              confirmAction={handleDelete}
              cancelAction={() => setModalDelete(false)}
            />
          </Tranparent>
        )}
      </section>
      <Footer />
    </>
  );
}
