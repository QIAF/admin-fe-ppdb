import React from "react";
import plus from "../../assets/images/plus.png";
import { Link } from "react-router-dom";

export default function MajorsContainer({
  children,
  handleInput,
  inputValue,
  setAddModal,
  name,
  thead,
  pageFor,
  className,
  maxHeight,
  onNameClick,
}) {
  return (
    <div className={`rounded-4 p-4 ${className} mt-4`}>
      {pageFor === "homepage" ? (
        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
          <h3 className="card-title text-nowrap fs-2 fw-semibold">
            Daftar Bidang Keahlian
          </h3>
          <Link
            to={"/majors"}
            className=" text-decoration-none text-nowrap fw-semibold"
          >
            Lihat Semua
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column flex-md-row gap-3 gap-md-0 justify-content-end align-items-md-center mb-4">
          <button
            type="button"
            onClick={() => setAddModal(true)}
            className="btn btn-primary rounded-3 btn-md text-white"
            style={{
              height: "2.8125rem",
              display: "flex",
              width: "11rem",
              padding: "0.25rem 0.625rem",
              alignItems: "center",
            }}
          >
            <img src={plus} alt="" className="me-2" />
            Tambah Keahlian
          </button>
        </div>
      )}

      <div
        className="table-wrapper"
        style={{
          height: "fit-content",
          minHeight: "13rem",
          maxHeight: `calc(100vh - ${maxHeight ?? "14rem"})`,
        }}
      >
        <table className="table table-borderless table-striped align-middle">
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
    </div>
  );
}
