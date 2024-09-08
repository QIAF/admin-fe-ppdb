import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function DataUser() {
  const componentRef = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();

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
  const imageUrl = data?.findData?.student_picture
    ? parseImageURL(data.findData?.student_picture)
    : null;
  console.log("Image URL:", imageUrl);

  const fetchData = async () => {
    const token = Cookies.get("token");
    console.log("Token untuk article:", token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `https://be-ppdb-online-update.vercel.app/api/v1/studentData/${id}`,
        config
      );

      console.log("API response:", res.data);
      setData(res.data.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="d-flex flex-column vw-100">
      <div className="flex-grow-1 container">
        <div ref={componentRef} style={{ width: "100%", height: "100%" }}>
          <div className="d-flex flex-row flex-wrap gap-4 justify-content-center custom-margin-center">
            <ImageWithFallback
              src={imageUrl}
              fallback={imageUrl}
              alt="photo avatar"
              className="rounded-2 object-fit-cover"
              style={{ maxWidth: "6rem", maxHeight: "8rem", width: "100%" }}
            />

            <table className="table table-borderless mt-0 table-responsive">
              <tbody>
                <tr>
                  <td>
                    <b>1. Data Calon Siswa</b>
                  </td>
                </tr>
                <tr>
                  <td>Nama Lengkap</td>
                  <td>:</td>
                  <td>{data?.findData?.student_name}</td>
                </tr>
                <tr>
                  <td>No KK Siswa</td>
                  <td>:</td>
                  <td>{data?.findData?.student_card_number}</td>
                </tr>
                <tr>
                  <td>NIK</td>
                  <td>:</td>
                  <td>{data?.findData?.family_card_number}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>:</td>
                  <td>{data?.findData?.student_gender}</td>
                </tr>
                <tr>
                  <td>Tempat Lahir</td>
                  <td>:</td>
                  <td>
                    {data?.findData?.place_birth}
                    {", "}
                    {formatDate(data?.findData?.date_birth)}
                  </td>
                </tr>
                <tr>
                  <td>Alamat Asal</td>
                  <td>:</td>
                  <td>{data?.findData?.student_address}</td>
                </tr>
                <tr>
                  <td>Alamat Di Yogyakarta</td>
                  <td>:</td>
                  <td>{data?.findData?.student_address_now}</td>
                </tr>
                <tr>
                  <td>Jarak Rumah ke Sekolah</td>
                  <td>:</td>
                  <td>{data?.findData?.student_distance}</td>
                </tr>
                <tr>
                  <td>Agama</td>
                  <td>:</td>
                  <td>{data?.findData?.student_religion}</td>
                </tr>
                <tr>
                  <td>Golongan Darah</td>
                  <td>:</td>
                  <td>{data?.findData?.student_blood_type}</td>
                </tr>
                <tr>
                  <td>Tinggi / Berat Badan</td>
                  <td>:</td>
                  <td>
                    {data?.findData?.student_height} /{" "}
                    {data?.findData?.student_weight}
                  </td>
                </tr>
                <tr>
                  <td>Anak Ke -</td>
                  <td>:</td>
                  <td>{data?.findData?.student_child}</td>
                </tr>
                <tr>
                  <td>KPS PKH/PIP/KMS Kota Yogyakarta</td>
                  <td>:</td>
                  <td>{data?.findData?.student_kps}</td>
                </tr>
                <tr>
                  <td>Hobi</td>
                  <td>:</td>
                  <td>{data?.findData?.student_hobby}</td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ height: "1rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <b>2. Data Orang Tua Calon Siswa</b>
                  </td>
                </tr>
                <tr>
                  <td>Nama Ayah</td>
                  <td>:</td>
                  <td>{data?.findData?.father_name}</td>
                </tr>
                <tr>
                  <td>Tempat, tanggal Lahir</td>
                  <td>:</td>
                  <td>
                    {data?.findData?.place_birth_father} {", "}
                    {formatDate(data?.findData?.father_birth)}
                  </td>
                </tr>
                <tr>
                  <td>Nama Ibu</td>
                  <td>:</td>
                  <td>{data?.findData?.mother_name}</td>
                </tr>
                <tr>
                  <td>Tempat, tanggal Lahir Ibu</td>
                  <td>:</td>
                  <td>
                    {data?.findData?.place_birth_mother}
                    {", "}
                    {formatDate(data?.findData?.mother_birth)}
                  </td>
                </tr>
                <tr>
                  <td>Nomor Telepon Rumah</td>
                  <td>:</td>
                  <td>{data?.findData?.phoneNumber_house}</td>
                </tr>
                <tr>
                  <td>Pekerjaan / Penghasilan Ayah</td>
                  <td>:</td>
                  <td>
                    {data?.findData?.father_job} /{" "}
                    {data?.findData?.father_income} Perbulan
                  </td>
                </tr>
                <tr>
                  <td>Pekerjaan Ibu / Penghasilan</td>
                  <td>:</td>
                  <td>
                    {data?.findData?.mother_job} /{" "}
                    {data?.findData?.mother_income} Perbulan
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ height: "1rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <b>3. Data Wali Calon Siswa</b>
                  </td>
                </tr>
                <tr>
                  <td>Nama Wali</td>
                  <td>:</td>
                  <td>{data?.findData?.guardian_name}</td>
                </tr>
                <tr>
                  <td>Alamat Wali</td>
                  <td>:</td>
                  <td>{data?.findData?.guardian_address}</td>
                </tr>
                <tr>
                  <td>Nomor Telepon Wali</td>
                  <td>:</td>
                  <td>{data?.findData?.guardian_phone}</td>
                </tr>
                <tr>
                  <td>Pekerjaan</td>
                  <td>:</td>
                  <td>{data?.findData?.guardian_job}</td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ height: "1rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <b>5. Data Asal Sekolah Calon Siswa</b>
                  </td>
                </tr>
                <tr>
                  <td>Nama Sekolah Asal</td>
                  <td>:</td>
                  <td>{data?.findData?.school_name}</td>
                </tr>
                <tr>
                  <td>Status Sekolah</td>
                  <td>:</td>
                  <td>{data?.findData?.school_status}</td>
                </tr>
                <tr>
                  <td>Alamat Sekolah Asal</td>
                  <td>:</td>
                  <td>{data?.findData?.school_address}</td>
                </tr>
                <tr>
                  <td>Nomor Ijazah</td>
                  <td>:</td>
                  <td>{data?.findData?.ijazah_number}</td>
                </tr>
                <tr>
                  <td>NISN</td>
                  <td>:</td>
                  <td>{data?.findData?.nisn}</td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ height: "1rem" }}></td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <b>Pilihan Bidang Keahlian</b>
                  </td>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>{data?.findData?.major_choice1}</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>{data?.findData?.major_choice2}</td>
                </tr>
              </tbody>
            </table>
            <div className="table-responsive" style={{ marginTop: "1rem" }}>
              <table
                style={{ width: "100%" }}
                className="table table-borderless table-striped mt-3"
              >
                <thead className="text-center">
                  <tr>
                    <th rowSpan={2}>Mata Pelajaran</th>
                    <th colSpan={2}>Kelas 7</th>
                    <th colSpan={2}>Kelas 8</th>
                    <th>Kelas 9</th>
                  </tr>
                  <tr>
                    <th>Semester 1</th>
                    <th>Semester 2</th>
                    <th>Semester 3</th>
                    <th>Semester 4</th>
                    <th>Semester 5</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>Matematika</td>
                    <td>{data?.findReportScore?.mathematics1}</td>
                    <td>{data?.findReportScore?.mathematics2}</td>
                    <td>{data?.findReportScore?.mathematics3}</td>
                    <td>{data?.findReportScore?.mathematics4}</td>
                    <td>{data?.findReportScore?.mathematics5}</td>
                  </tr>
                  <tr>
                    <td>IPA</td>
                    <td>{data?.findReportScore?.science1}</td>
                    <td>{data?.findReportScore?.science2}</td>
                    <td>{data?.findReportScore?.science3}</td>
                    <td>{data?.findReportScore?.science4}</td>
                    <td>{data?.findReportScore?.science5}</td>
                  </tr>
                  <tr>
                    <td>Bahasa Indonesia</td>
                    <td>{data?.findReportScore?.indonesian1}</td>
                    <td>{data?.findReportScore?.indonesian2}</td>
                    <td>{data?.findReportScore?.indonesian3}</td>
                    <td>{data?.findReportScore?.indonesian4}</td>
                    <td>{data?.findReportScore?.indonesian5}</td>
                  </tr>
                  <tr>
                    <td>Bahasa Inggris</td>
                    <td>{data?.findReportScore?.english1}</td>
                    <td>{data?.findReportScore?.english2}</td>
                    <td>{data?.findReportScore?.english3}</td>
                    <td>{data?.findReportScore?.english4}</td>
                    <td>{data?.findReportScore?.english5}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Rata-Rata</b>
                    </td>
                    <td colSpan={5}>
                      <b>{data?.findReportScore?.total_report_score}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterWhite />
    </div>
  );
}
