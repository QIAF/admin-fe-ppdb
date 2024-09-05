import React, { useEffect, useState } from "react";
import { Input } from "../../components/UI/Input/Input";
import useForm from "../../components/Hooks/UseForm";
import { useLocation, useNavigate } from "react-router";
import { dataStudent, validateStudentData } from "../../utils/validation";
import Button from "../../components/UI/Button/Button";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Spinner from "../../components/Loader/Spinner";

export default function UpdateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [loading, setLoading] = useState();
  const idUser = state?.id;
  console.log("Location State:", state);
  console.log("User ID:", idUser);

  const initialState = {
    student_name: state.student_name ?? "",
    family_card_number: state.family_card_number ?? "",
    student_gender: state.student_gender ?? "",
    place_birth: state.place_birth ?? "",
    date_birth: state.date_birth ?? "",
    student_address: state.student_address ?? "",
    student_address_now: state.student_address_now ?? "",
    student_distance: state.student_distance ?? "",
    student_religion: state.student_religion ?? "",
    student_blood_type: state.student_blood_type ?? "",
    student_height: state.student_height ?? "",
    student_weight: state.student_weight ?? "",
    student_child: state.student_child ?? "",
    student_kps: state.student_kps ?? "",
    student_hobby: state.student_hobby ?? "",

    father_name: state.father_name ?? "",
    place_birth_father: state.place_birth_father ?? "",
    father_birth: state.father_birth ?? "",
    father_job: state.father_job ?? "",
    father_income: state.father_income ?? "",
    mother_name: state.mother_name ?? "",
    place_birth_mother: state.place_birth_mother ?? "",
    mother_job: state.mother_job ?? "",
    mother_income: state.mother_income ?? "",
    phoneNumber_house: state.phoneNumber_house ?? "",

    guardian_name: state.guardian_name ?? "",
    guardian_address: state.guardian_address ?? "",
    guardian_phone: state.guardian_phone ?? "",
    guardian_job: state.guardian_job ?? "",

    school_name: state.school_name ?? "",
    school_status: state.school_status ?? "",
    school_address: state.school_address ?? "",
    ijazah_number: state.ijazah_number ?? "",
    major_choice: state.major_choice ?? "",
    nisn: state.nisn ?? "",

    mathematics1: state.report.mathematics1 ?? "",
    mathematics2: state.report.mathematics2 ?? "",
    mathematics3: state.report.mathematics3 ?? "",
    mathematics4: state.report.mathematics4 ?? "",
    mathematics5: state.report.mathematics5 ?? "",

    science1: state.report.science1 ?? "",
    science2: state.report.science2 ?? "",
    science3: state.report.science3 ?? "",
    science4: state.report.science4 ?? "",
    science5: state.report.science5 ?? "",

    indonesian1: state.report.indonesian1 ?? "",
    indonesian2: state.report.indonesian2 ?? "",
    indonesian3: state.report.indonesian3 ?? "",
    indonesian4: state.report.indonesian4 ?? "",
    indonesian5: state.report.indonesian5 ?? "",

    english1: state.report.english1 ?? "",
    english2: state.report.english2 ?? "",
    english3: state.report.english3 ?? "",
    english4: state.report.english4 ?? "",
    english5: state.report.english5 ?? "",
  };
  const initialError = {
    student_name: "",
    family_card_number: "",
    student_gender: "",
    place_birth: "",
    date_birth: "",
    student_address: "",
    student_address_now: "",
    student_distance: "",
    student_religion: "",
    student_blood_type: "",
    student_height: "",
    student_weight: "",
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
    major_choice: "",
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
  };

  const { form, setForm, errors, setErrors, handleInput } = useForm(
    initialState,
    initialError
  );
  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleUpdateData = async (data) => {
    setLoading(true);
    const token = Cookies.get("token");
    console.log("Token untuk article:", token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = dataStudent(data);
    console.log("Form Data:", formData);
    try {
      const res = await axios.patch(
        `https://be-ppdb-online-update.vercel.app/api/v1/studentData/update/${idUser}`,
        formData,
        config
      );
      if (res.status === 200) {
        console.log("Data Terbaru:", res.data);
        toast.success("Anda berhasil mengubah nilai", { delay: 800 });
        navigate("/users");
      }
    } catch (error) {
      console.error(
        "Kesalahan saat memperbarui data:",
        error.response?.data || error.message
      );
      setLoading(false);
      toast.error("Anda gagal mengubah nilai", { delay: 800 });
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
                  <div className="row mb-3">
                    <label
                      htmlFor="student_name"
                      className="col col-form-label"
                    >
                      Nama Lengkap
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="family_card_number"
                      className="col col-form-label"
                    >
                      NIK
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
                        value={form.student_gender}
                        onChange={handleInput}
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="place_birth" className="col col-form-label">
                      Tempat lahir
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_address"
                      className="col col-form-label"
                    >
                      Alamat Asal
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_distance"
                      className="col col-form-label"
                    >
                      Alamat di Yogyakrata
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_distance"
                      className="col col-form-label"
                    >
                      Jarak dari rumah ke SMK 3 Muhammadiyah Yogyakarta
                      {!form.student_distance && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="student_distance"
                        name="student_distance"
                        value={form.student_distance} // Menyinkronkan nilai select dengan form
                        onChange={handleInput} // Memperbarui form saat pilihan berubah
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        <option value="≤ 1 KM">≤ 1 KM</option>
                        <option value="≤ 2 KM">≤ 2 KM</option>
                        <option value="≤ 3 KM">≤ 3 KM</option>
                        <option value="≤ 4 KM">≤ 4 KM</option>
                        <option value="≥ 4 KM">≥ 4 KM</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_religion"
                      className="col col-form-label"
                    >
                      Agama
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
                        <option value="">Pilih Agama</option>{" "}
                        {/* Opsi default untuk mendorong pilihan */}
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Budha">Budha</option>
                        <option value="Khonghucu">Khonghucu</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_blood_type"
                      className="col col-form-label"
                    >
                      Golongan Darah
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_height"
                      className="col col-form-label"
                    >
                      Tinggi Badan
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_weight"
                      className="col col-form-label"
                    >
                      Berat Badan
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_child"
                      className="col col-form-label"
                    >
                      Anak ke-
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
                        <option value="Ya">Ya</option>
                        <option value="Tidak">Tidak</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="student_hobby"
                      className="col col-form-label"
                    >
                      Hobi
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_name"
                      className="col col-form-label"
                    >
                      Nama Ayah
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputplace_birth_father"
                      className="col col-form-label"
                    >
                      Tempat lahir
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_birth"
                      className="col col-form-label"
                    >
                      Tanggal lahir
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_name"
                      className="col col-form-label"
                    >
                      Nama Ibu
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputplace_birth_mother"
                      className="col col-form-label"
                    >
                      Tempat Lahir Ibu
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_birth"
                      className="col col-form-label"
                    >
                      Tanggal Lahir Ibu
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPhoneNumber"
                      className="col col-form-label"
                    >
                      Nomor Telepon Rumah
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputfather_job"
                      className="col col-form-label"
                    >
                      Pekerjaan ayah
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="father_income"
                      className="col col-form-label"
                    >
                      Pendapatan ayah perbulan
                      {!form.father_income && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="father_income"
                        name="father_income"
                        value={form.father_income} // Menyinkronkan nilai select dengan form
                        onChange={handleInput} // Memperbarui form saat pilihan berubah
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        <option value="≥ Rp 500.000">≥ Rp 500.000</option>
                        <option value="≥ Rp 1.000.000">≥ Rp 1.000.000</option>
                        <option value="≥ Rp 2.000.000">≥ Rp 2.000.000</option>
                        <option value="≥ Rp 3.000.000">≥ Rp 3.000.000</option>
                        <option value="≥ Rp 4.000.000">≥ Rp 4.000.000</option>
                        <option value="≥ Rp 5.000.000">≥ Rp 5.000.000</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputmother_job"
                      className="col col-form-label"
                    >
                      Pekerjaan Ibu
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="mother_income"
                      className="col col-form-label"
                    >
                      Pendapatan ibu perbulan
                      {!form.mother_income && (
                        <span className="required">*</span>
                      )}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="mother_income"
                        name="mother_income"
                        value={form.mother_income} // Menyinkronkan nilai select dengan form
                        onChange={handleInput} // Memperbarui form saat pilihan berubah
                      >
                        <option value="">Pilih salah satu</option>{" "}
                        <option value="≥ Rp 500.000">≥ Rp 500.000</option>
                        <option value="≥ Rp 1.000.000">≥ Rp 1.000.000</option>
                        <option value="≥ Rp 2.000.000">≥ Rp 2.000.000</option>
                        <option value="≥ Rp 3.000.000">≥ Rp 3.000.000</option>
                        <option value="≥ Rp 4.000.000">≥ Rp 4.000.000</option>
                        <option value="≥ Rp 5.000.000">≥ Rp 5.000.000</option>
                      </select>
                    </div>
                  </div>
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

                  <div className="row mb-3">
                    <label
                      htmlFor="inputschool_name"
                      className="col col-form-label"
                    >
                      Nama Sekolah
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
                        <option value="Negeri">Negeri</option>
                        <option value="Swasta">Swasta</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputschool_address"
                      className="col col-form-label"
                    >
                      Alamat Sekolah
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"school_addressh"}
                        name="school_address"
                        value={form.school_address}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputijazah_number"
                      className="col col-form-label"
                    >
                      Nomor Ijazah
                    </label>
                    <div className="col-sm-8">
                      <Input
                        type={"text"}
                        className={"form-control"}
                        id={"ijazah_number"}
                        name="ijazah_number"
                        value={form.ijazah_number}
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="nisn" className="col col-form-label">
                      NISN
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
                    </div>
                  </div>
                  <table style={{ width: "100%" }} className="table">
                    <tbody className="m-auto">
                      <tr>
                        <td className="text-center">
                          <b>Matematika</b>
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
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <b>IPA</b>
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"science1"}
                            className={"form-control"}
                            value={form.science1}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"science2"}
                            className={"form-control"}
                            value={form.science2}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name={"science3"}
                            className={"form-control"}
                            value={form.science3}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="science4"
                            className={"form-control"}
                            value={form.science4}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="science5"
                            className={"form-control"}
                            value={form?.science5}
                            onChange={handleInput}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <b>Bahasa Indonesia</b>
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian1"
                            className={"form-control"}
                            value={form.indonesian1}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian2"
                            className={"form-control"}
                            value={form.indonesian2}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian3"
                            className={"form-control"}
                            value={form.indonesian3}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian4"
                            className={"form-control"}
                            value={form.indonesian4}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="indonesian5"
                            className={"form-control"}
                            value={form.indonesian5}
                            onChange={handleInput}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <b>Bahasa Inggris</b>
                        </td>

                        <td>
                          <Input
                            type={"number"}
                            name="english1"
                            className={"form-control"}
                            value={form.english1}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english2"
                            className={"form-control"}
                            value={form.english2}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english3"
                            className={"form-control"}
                            value={form.english3}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english4"
                            className={"form-control"}
                            value={form.english4}
                            onChange={handleInput}
                          />
                        </td>
                        <td>
                          <Input
                            type={"number"}
                            name="english5"
                            className={"form-control"}
                            value={form.english5}
                            onChange={handleInput}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="footer  mt-5">
                <div className="d-flex flex-row justify-content-center align-items-center gap-3 ">
                  <Button
                    // Nonaktifkan tombol jika form belum diubah atau loading
                    type="submit"
                    className={"btn-primary text-white fw-semibold"}
                    onClick={() => handleUpdateData(form)}
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
                  {/* <Button
                    type="submit"
                    className={"btn-primary text-white fw-semibold"}
                    onClick={() => handleUpdateData(form)}
                  >
                    Simpan
                  </Button> */}
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
