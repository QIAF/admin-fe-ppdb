import React, { useState } from "react";
import { Input } from "../../components/UI/Input/Input";
import { useNavigate } from "react-router";
import Button from "../../components/UI/Button/Button";
import { dataStudent, validateStudentData } from "../../utils/validation";
import axios from "axios";
import { toast } from "react-toastify";
import "./user.css";
import Footer from "../../components/Footer/Footer";
import { ErrMsg } from "../../components/Error/ErrMsg";

export default function CreateUser() {
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [form, setForm] = useState(() => {
    const savedData = localStorage.getItem("form");
    return savedData
      ? JSON.parse(savedData)
      : {
          student_name: "",
          student_card_number: "",
          family_card_number: "",
          student_gender: "",
          place_birth: "",
          date_birth: "",
          student_address: "",
          student_address_now: "",
          student_distance: "",
          student_religion: "",
          student_blood_type: "",
          student_weight: "",
          student_height: "",
          student_child: "",
          student_kps: "",
          student_hobby: "",

          father_name: "",
          father_job: "",
          father_income: "",
          place_birth_father: "",
          father_birth: "",
          mother_name: "",
          mother_job: "",
          mother_income: "",
          place_birth_mother: "",
          mother_birth: "",
          phoneNumber_house: "",

          guardian_name: "",
          guardian_address: "",
          guardian_phone: "",
          guardian_job: "",

          school_name: "",
          school_status: "",
          school_address: "",
          ijazah_number: "",
          major_choice1: "",
          major_choice2: "",
          nisn: "",

          mathematics1: "",
          mathematics2: "",
          mathematics3: "",
          mathematics4: "",
          mathematics5: "",

          science1: "",
          science2: "",
          science3: "",
          science4: "",
          science5: "",

          indonesian1: "",
          indonesian2: "",
          indonesian3: "",
          indonesian4: "",
          indonesian5: "",

          english1: "",
          english2: "",
          english3: "",
          english4: "",
          english5: "",
          interview_score: 1,
          health_score: 1,

          studentDocument: "",
        };
  });

  const handleFilePdf = (e) => {
    const { name, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files[0], // Memasukkan file yang dipilih ke dalam formData
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const handleCreate = async () => {
    const dataToSend = dataStudent(form);

    const formDataToSend = new FormData();
    for (let key in dataToSend) {
      formDataToSend.append(key, dataToSend[key]);
    }

    if (validateStudentData(form, setError)) {
      const token = localStorage.getItem("token");
      console.log("Token untuk request:", token);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Kirim permintaan ke server
        const res = await axios.post(
          "http://localhost:3000/api/v1/studentData/create",
          formDataToSend,
          config
        );

        if (res.status === 200) {
          toast.success("Berhasil menambahkan data", { delay: 800 });
          navigate("/users");

          localStorage.removeItem("form");
        }
      } catch (error) {
        // Menangkap dan mencetak pesan error secara lebih mendetail
        toast.error("Gagal menambahkan data", { delay: 800 });

        // Jika server mengirim response error
        if (error.response) {
          console.error("Error Data:", error.response.data);
          console.error("Error Status:", error.response.status);
          console.error("Error Headers:", error.response.headers);
        } else if (error.request) {
          // Jika tidak ada response dari server
          console.error("Tidak ada response dari server:", error.request);
        } else {
          // Jika ada sesuatu yang salah dalam pengaturan permintaan
          console.error("Error Pengaturan Permintaan:", error.message);
        }
      }
    } else {
      alert("Data belum lengkap");
    }
  };

  return (
    <>
      <div className="flex-column mx-4 justify-content-center">
        <div className="justify-content-center">
          <div className="table-responsive container ">
            <div className="center">
              <div className="header">
                <h5 style={{ color: "#816503" }}></h5>
              </div>
              <br />
              <div className="body center ">
                <div className="student-data">
                  <h5 style={{ marginBottom: "30px" }}>Data Calon Siswa</h5>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_name"
                      className="col col-form-label"
                    >
                      Nama Lengkap{" "}
                      {!form.student_name && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8 ">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"student_name"}
                        name="student_name"
                        value={form.student_name}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_name} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_card_number"
                      className="col col-form-label"
                    >
                      No KK Siswa{" "}
                      {!form.student_card_number && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8 ">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"student_card_number"}
                        name="student_card_number"
                        value={form.student_card_number_card_number}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_card_number} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="family_card_number"
                      className="col col-form-label"
                    >
                      NIK{" "}
                      {!form.family_card_number && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8 ">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"family_card_number"}
                        name="family_card_number"
                        value={form.family_card_number}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.family_card_number} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_gender"
                      className="col col-form-label"
                    >
                      Jenis kelamin{" "}
                      {!form.student_gender && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="student_gender"
                        name="student_gender"
                        value={form.student_gender} // Menyinkronkan nilai select dengan formData
                        onChange={handleInput} // Memperbarui formData saat pilihan berubah
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>

                      <ErrMsg msg={error.student_gender} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="place_birth" className="col col-form-label">
                      Tempat lahir
                      {!form.place_birth && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        id="place_birth"
                        name="place_birth"
                        className="form-control"
                        placeholder=""
                        style={{ height: 100 }}
                        value={form.place_birth}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="date_birth" className="col col-form-label">
                      Tanggal lahir
                      {!form.date_birth && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"date"}
                        className={"form-control"}
                        id={"date_birth"}
                        name="date_birth"
                        value={form.date_birth}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.date_birth} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_address"
                      className="col col-form-label"
                    >
                      Alamat Asal{" "}
                      {!form.student_address && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        id={"student_address"}
                        name="student_address"
                        className="form-control"
                        style={{ height: 100 }}
                        value={form.student_address}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_address} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_distance"
                      className="col col-form-label"
                    >
                      Alamat di Yogyakarta
                      {!form.student_address_now && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"student_address_now"}
                        name="student_address_now"
                        value={form.student_address_now}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_address_now} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_distance"
                      className="col col-form-label"
                    >
                      Jarak rumah ke sekolah{" "}
                      {!form.student_distance && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"student_distance"}
                        name="student_distance"
                        value={form.student_distance}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_distance} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_religion"
                      className="col col-form-label"
                    >
                      Agama
                      {!form.student_religion && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="student_religion"
                        name="student_religion"
                        value={form.student_religion} // Menyinkronkan nilai select dengan form
                        onChange={handleInput} // Memperbarui form saat pilihan berubah
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Budha">Budha</option>
                        <option value="Khonghucu">Khonghucu</option>
                      </select>
                      <ErrMsg msg={error.student_religion} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_blood_type"
                      className="col col-form-label"
                    >
                      Golongan Darah{" "}
                      {!form.student_blood_type && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"student_blood_type"}
                        name="student_blood_type"
                        value={form.student_blood_type}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_blood_type} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_height"
                      className="col col-form-label"
                    >
                      Tinggi Badan{" "}
                      {!form.student_weight && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"number"}
                        className={"form-control"}
                        id={"student_height"}
                        name="student_height"
                        value={form.student_height}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_height} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_weight"
                      className="col col-form-label"
                    >
                      Berat Badan{" "}
                      {!form.student_height && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        id={"student_weight"}
                        name="student_weight"
                        type={"number"}
                        className={"form-control"}
                        value={form.student_weight}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_weight} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_child"
                      className="col col-form-label"
                    >
                      Anak ke-{" "}
                      {!form.student_child && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"number"}
                        className={"form-control"}
                        id={"student_child"}
                        name={"student_child"}
                        value={form.student_child}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_child} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="student_kps" className="col col-form-label">
                      KPS,PKH/PIP/KMS Kota{" "}
                      {!form.student_kps && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="student_kps"
                        name="student_kps"
                        value={form.student_kps} // Menyinkronkan nilai select dengan formData
                        onChange={handleInput} // Memperbarui formData saat pilihan berubah
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Ya">Tidak</option>
                        <option value="Tidak">Ya</option>
                      </select>
                      <ErrMsg msg={error.student_child} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_hobby"
                      className="col col-form-label"
                    >
                      Hobi{" "}
                      {!form.student_hobby && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"student_hobby"}
                        name={"student_hobby"}
                        value={form.student_hobby}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.student_hobby} />
                    </div>
                  </div>
                  <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Data Orangtua Calon Siswa
                  </h5>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_name"
                      className="col col-form-label"
                    >
                      Nama Ayah{" "}
                      {!form.father_name && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"father_name"}
                        name="father_name"
                        value={form.father_name}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.father_name} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputplace_birth_father"
                      className="col col-form-label"
                    >
                      Tempat lahir{" "}
                      {!form.place_birth_father && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        id={"place_birth_father"}
                        name="place_birth_father"
                        className="form-control"
                        placeholder=""
                        style={{ height: 100 }}
                        value={form.place_birth_father}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.place_birth_father} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_birth"
                      className="col col-form-label"
                    >
                      Tanggal lahir{" "}
                      {!form.father_birth && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        id={"father_birth"}
                        name="father_birth"
                        type={"date"}
                        className={"form-control"}
                        value={form.father_birth}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.father_birth} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_name"
                      className="col col-form-label"
                    >
                      Nama Ibu{" "}
                      {!form.mother_name && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        id={"mother_name"}
                        name="mother_name"
                        type={"text"}
                        className={"form-control"}
                        value={form.mother_name}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.mother_name} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputplace_birth_mother"
                      className="col col-form-label"
                    >
                      Tempat Lahir Ibu{" "}
                      {!form.place_birth_mother && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        id={"place_birth_mother"}
                        name="place_birth_mother"
                        className="form-control"
                        placeholder=""
                        style={{ height: 100 }}
                        value={form.place_birth_mother}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.place_birth_mother} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_birth"
                      className="col col-form-label"
                    >
                      Tanggal Lahir Ibu{" "}
                      {!form.mother_birth && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"date"}
                        className={"form-control"}
                        id={"-mother_birth"}
                        name="mother_birth"
                        value={form.mother_birth}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.place_birth_mother} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNumber"
                      className="col col-form-label"
                    >
                      Nomor Telepon Rumah{" "}
                      {!form.phoneNumber_house && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"number"}
                        className={"form-control"}
                        id={"phoneNumber_house"}
                        name="phoneNumber_house"
                        value={form.phoneNumber_house}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.phoneNumber_house} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_job"
                      className="col col-form-label"
                    >
                      Pekerjaan ayah{" "}
                      {!form.father_job && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"father_job"}
                        name="father_job"
                        value={form.father_job}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.father_job} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_job"
                      className="col col-form-label"
                    >
                      Pendapatan ayah perbulan{" "}
                      {!form.father_income && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"father_income"}
                        name="father_income"
                        value={form.father_income}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.father_income} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_job"
                      className="col col-form-label"
                    >
                      Pekerjaan Ibu{" "}
                      {!form.mother_job && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"mother_job"}
                        name="mother_job"
                        value={form.mother_job}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.mother_job} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_job"
                      className="col col-form-label"
                    >
                      Pendapatan Ibu Perbulan{" "}
                      {!form.mother_income && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"mother_income"}
                        name="mother_income"
                        value={form.mother_income}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.mother_income} />
                    </div>
                  </div>
                  <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Data Wali Calon Siswa
                  </h5>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputguardian_name"
                      className="col col-form-label"
                    >
                      Nama Wali
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"guardian_name"}
                        name="guardian_name"
                        value={form.guardian_name}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputguardian_address"
                      className="col col-form-label"
                    >
                      Alamat
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        id="guardian_address"
                        name="guardian_address"
                        className="form-control"
                        placeholder=""
                        style={{ height: 100 }}
                        value={form.guardian_address}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputguardian_phone"
                      className="col col-form-label"
                    >
                      Nomor Telepon
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"Number"}
                        className={"form-control"}
                        id={"guardian_phone"}
                        name={"guardian_phone"}
                        value={form.guardian_phone}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputguardian_job"
                      className="col col-form-label"
                    >
                      Pekerjaan
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"guardian_job"}
                        name={"guardian_job"}
                        value={form.guardian_job}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Data Asal Sekolah Calon Siswa
                  </h5>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputschool_name"
                      className="col col-form-label"
                    >
                      Nama Sekolah
                      {!form.school_name && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"school_name"}
                        name="school_name"
                        value={form.school_name}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputschool_status"
                      className="col col-form-label"
                    >
                      Status Sekolah
                      {!form.school_status && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="school_status"
                        name="school_status"
                        value={form.school_status}
                        onChange={handleInput}
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Negeri">Negeri</option>
                        <option value="Swasta">Swasta</option>
                      </select>

                      <ErrMsg msg={error.school_status} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputschool_address"
                      className="col col-form-label"
                    >
                      Alamat Sekolah
                      {!form.school_address && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"school_address"}
                        name="school_address"
                        value={form.school_address}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.school_address} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputijazah_number"
                      className="col col-form-label"
                    >
                      Nomor Ijazah
                      {!form.ijazah_number && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"number"}
                        className={"form-control"}
                        id={"ijazah_number"}
                        name="ijazah_number"
                        value={form.ijazah_number}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.ijazah_number} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="nisn" className="col col-form-label">
                      NISN
                      {!form.nisn && <span className="required">*</span>}
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"nisn"}
                        name="nisn"
                        value={form.nisn}
                        onChange={handleInput}
                      />
                      <ErrMsg msg={error.nisn} />
                    </div>
                  </div>
                  <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Data Pilihan Bidang Keahlian
                  </h5>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_gender"
                      className="col col-form-label"
                    >
                      Pilihan Bidang Keahlian 1
                      {!form.major_choice1 && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="major_choice1"
                        name="major_choice1"
                        value={form.major_choice1} // Menyinkronkan nilai select dengan formData
                        onChange={handleInput} // Memperbarui formData saat pilihan berubah
                      >
                        <option value="">Pilihan pertama</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Teknik Kendaraan">
                          Teknik Kendaraan
                        </option>
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
                      <ErrMsg msg={error.major_choice1} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_gender"
                      className="col col-form-label"
                    >
                      Pilihan Bidang Keahlian 2
                      {!form.major_choice2 && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="major_choice2"
                        name="major_choice2"
                        value={form.major_choice2} // Menyinkronkan nilai select dengan formData
                        onChange={handleInput} // Memperbarui formData saat pilihan berubah
                      >
                        <option value="">Pilihan Kedua</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Teknik Kendaraan">
                          Teknik Kendaraan
                        </option>
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
                      <ErrMsg msg={error.major_choice2} />
                    </div>
                  </div>
                  <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Upload Dokumen
                  </h5>
                  <div className="mb-3">
                    <label htmlFor="studentDocument" className="form-label">
                      <b>
                        Siswa diwajibkan untuk mengunggah dokumen PDF dengan
                        format nama file menggunakan Nama Lengkap Anda:{" "}
                        {!form.studentDocument && (
                          <span className="required">*</span>
                        )}
                      </b>
                      <br /> <br />
                      1.Scan/foto Kartu Keluarga <br />
                      2. Scan/foto Akta Kelahiran <br />
                      3. Sertifikat Prestasi <br />
                      4. Surat Keterangan Lulus <br />
                      5. Ijazah SMP <br />
                      <br />
                      Contoh format nama file: Nama_Lengkap_Siswa.pdf <br />{" "}
                      Pastikan semua dokumen yang diunggah jelas dan terbaca
                      dengan baik. <br />
                      <br />
                    </label>
                    <Input
                      type={"file"}
                      id="studentDocument"
                      name="studentDocument"
                      className={"form-control"}
                      onChange={handleFilePdf}
                      accept=".pdf"
                      multiple={false}
                    />
                    <ErrMsg msg={error.studentDocument} />
                  </div>
                  <h5 style={{ marginTop: "50px", marginBottom: "30px" }}>
                    Data Pilihan Bidang Keahlian
                  </h5>

                  <table style={{ width: "100%" }} className="table">
                    <tbody className="m-auto">
                      <tr>
                        <td className="text-center">
                          <b>
                            Matematika
                            {!form.mathematics5 && (
                              <span className="required">*</span>
                            )}
                          </b>
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"mathematics1"}
                            className={"form-control"}
                            placeholder={"sem 1"}
                            value={form.mathematics1}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.mathematics1} />
                        </td>

                        <td>
                          <Input
                            type={"number"}
                            name={"mathematics2"}
                            className={"form-control"}
                            placeholder={"sem 2"}
                            value={form.mathematics2}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.mathematics2} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"mathematics3"}
                            className={"form-control"}
                            placeholder={"sem 3"}
                            value={form.mathematics3}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.mathematics3} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"mathematics4"}
                            className={"form-control"}
                            placeholder={"sem 4"}
                            value={form.mathematics4}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.mathematics4} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"mathematics5"}
                            className={"form-control"}
                            placeholder={"sem 5"}
                            value={form.mathematics5}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.mathematics5} />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <b>
                            IPA
                            {!form.science5 && (
                              <span className="required">*</span>
                            )}
                          </b>
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"science1"}
                            className={"form-control"}
                            value={form.science1}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.science1} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"science2"}
                            className={"form-control"}
                            value={form.science2}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.science2} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"science3"}
                            className={"form-control"}
                            value={form.science3}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.science3} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="science4"
                            className={"form-control"}
                            value={form.science4}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.science4} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="science5"
                            className={"form-control"}
                            value={form?.science5}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.science5} />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <b>
                            Bahasa Indonesia
                            {!form.indonesian5 && (
                              <span className="required">*</span>
                            )}
                          </b>
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian1"
                            className={"form-control"}
                            value={form.indonesian1}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.indonesian1} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian2"
                            className={"form-control"}
                            value={form.indonesian2}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.indonesian2} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian3"
                            className={"form-control"}
                            value={form.indonesian3}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.indonesian3} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian4"
                            className={"form-control"}
                            value={form.indonesian4}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.indonesian4} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian5"
                            className={"form-control"}
                            value={form.indonesian5}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.indonesian5} />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <b>
                            Bahasa Inggris
                            {!form.english5 && (
                              <span className="required">*</span>
                            )}
                          </b>
                        </td>

                        <td>
                          <Input
                            type={"number"}
                            name="english1"
                            className={"form-control"}
                            value={form.english1}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.english1} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english2"
                            className={"form-control"}
                            value={form.english2}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.english2} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english3"
                            className={"form-control"}
                            value={form.english3}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.english3} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english4"
                            className={"form-control"}
                            value={form.english4}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.english4} />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english5"
                            className={"form-control"}
                            value={form.english5}
                            onChange={handleInput}
                          />
                          <ErrMsg msg={error.english5} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="footer  mt-5">
                <div className="d-flex flex-row justify-content-center align-items-center gap-3 ">
                  <Button
                    type="submit"
                    className={"btn-primary text-white fw-semibold"}
                    onClick={() => handleCreate(form)}
                    error={error}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
