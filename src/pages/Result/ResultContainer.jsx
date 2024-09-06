import React, { useRef } from "react";
import { Input } from "../../components/UI/Input/Input";
import { pdf } from "@react-pdf/renderer";
import Button from "../../components/UI/Button/Button";
import LogoSmk from "../../assets/images/logo-only.png";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Table PDF
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 20,
  },
  kopSuratContainer: {
    marginRight: 60,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Jarak bawah setelah kop surat
  },
  logo: {
    width: 80, // Lebar logo
    height: 60, // Tinggi logo
    marginRight: 10, // Jarak antara logo dan teks
  },
  kopSurat: {
    fontWeight: "extrabold",
    textAlign: "left", // Teks rata kiri
    fontSize: 12, // Ukuran font untuk kop surat
  },
  title: {
    fontSize: 13, // Ukuran font untuk judul
    fontWeight: "bold",
    marginTop: 15, // Membuat judul menjadi bold
    marginBottom: 20, // Jarak antara judul dan tabel
    textAlign: "center", // Teks berada di tengah
  },
  table: {
    marginBottom: "100px",
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tableCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#000", // Warna border hitam
    padding: 2,
    fontSize: 11, // Ukuran teks untuk sel tabel
  },
  tableHeader: {
    textAlign: "center",
    fontSize: 11, // Ukuran teks untuk header
    fontWeight: "bold", // Teks header menjadi bold
    textTransform: "capitalize", // Mengubah teks header menjadi huruf kapital
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000", // Warna garis bawah
    marginVertical: 10, // Jarak atas dan bawah garis
  },
});

const PdfDocument = ({ thead, children }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Kop Surat dengan Logo */}
          <View style={styles.kopSuratContainer}>
            <Image
              style={styles.logo}
              src={LogoSmk} // Ganti dengan path ke file logo Anda
            />
            <View>
              <Text style={styles.kopSurat}>SMK Muhammadiyah 3 Yogyakarta</Text>
              <Text style={styles.kopSurat}>
                Alamat: Jl. Pramuka No.62, Giwangan, Kec. Umbulharjo, Kota
                Yogyakarta, Daerah Istimewa Yogyakarta 55163
              </Text>
              <Text style={styles.kopSurat}>Telp: (0274) 123456</Text>
            </View>
          </View>
          <View style={styles.line} />

          {/* Judul */}
          <Text style={styles.title}>
            HASIL SELEKSI PENDAFTARAN PENERIMAAN PESERTA DIDIK BARU (PPDB) TAHUN
            PELAJARAN 2023/2024
          </Text>

          {/* Tabel */}
          <View style={styles.table}>
            {/* Render Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              {thead.map((header, index) => (
                <Text style={styles.tableCell} key={index}>
                  {header}
                </Text>
              ))}
            </View>
            {/* Render Table Rows */}
            {children.map((row, index) => (
              <View style={styles.tableRow} key={index}>
                {row.map((cell, cellIndex) => (
                  <Text style={styles.tableCell} key={cellIndex}>
                    {cell}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Table Result
export default function ResultContainer({
  children,
  handleInputSearch,
  searchTerm,
  className,
  name,
  thead,
  maxHeight,
}) {
  const printRef = useRef();

  const handlePrint = async () => {
    try {
      const rows = Array.from(
        printRef.current.querySelectorAll("tbody tr")
      ).map((row) =>
        Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent)
      );

      const blob = await pdf(
        <PdfDocument thead={thead}>{rows}</PdfDocument>
      ).toBlob();
      const printWindow = window.open(URL.createObjectURL(blob));
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={`table-responsive rounded-4 p-4 ${className} mt-4`}>
      <div className="d-flex flex-row justify-content-between align-items-center mb-4">
        <h3 className="card-title text-nowrap fs-2 fw-semibold">
          Rekapitulasi hasil akhir seleksi
        </h3>
        <div className="position-relative mt-3 mt-md-0">
          <Input
            name={name}
            onChange={(e) => handleInputSearch(e)}
            value={searchTerm}
            type={"text"}
            placeholder="Cari nama siswa..."
            className={"rounded-4 ps-5 border-2 bg-green py-1"}
          />
        </div>
      </div>
      <div ref={printRef}>
        <table className="table align-middle">
          <thead className="sticky-top z-0 ">
            <tr>
              {thead?.map((item, index) => (
                <th key={index} scope="col">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Button className={"btn btn-outline-primary"} onClick={handlePrint}>
          Cetak
        </Button>
      </div>
    </div>
  );
}
