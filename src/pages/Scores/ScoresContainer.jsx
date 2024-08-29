import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/UI/Input/Input";

export default function ScoresContainer({
  children,
  handleInputSearch,
  searchTerm,
  setAddModal,
  name,
  thead,
  pageFor,
  className,
  maxHeight,
  onNameClick,
  title,
}) {
  return (
    <div className={`rounded-4 p-4 ${className} mt-4`}>
      <div className="d-flex flex-row justify-content-between align-items-center mb-5">
        <h3 className="card-title text-nowrap fs-5 fw-semibold">
          Rekapitulasi hasil seleksi
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
