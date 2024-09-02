import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/UI/Input/Input";
import plus from "../../assets/images/plus.png";
import { useState } from "react";
export default function UserTable({
  handleInputSearch,
  children,
  searchTerm,
  thead,
  pageFor,
  className,
  maxHeight,
}) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const onNavigateAdd = (userData, offset) => {
    navigate(`/users/createUser`, {
      state: { data: userData, offset: offset },
    });
  };
  return (
    <div className={`table-responsive rounded-4 p-4 ${className} mt-4`}>
      {pageFor === "homepage" && (
        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
          <h3 className="card-title text-nowrap fs-4 fw-semibold">
            Daftar User
          </h3>
          <Link
            to={"/users"}
            className=" text-decoration-none text-nowrap fw-semibold"
          >
            Lihat Semua
          </Link>
        </div>
      )}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <div className="d-flex justify-content-center w-100 mt-3 mt-md-0">
          <Input
            name={name}
            onChange={(e) => handleInputSearch(e)}
            value={searchTerm}
            type={"text"}
            placeholder="Cari nama siswa..."
            className={"rounded-4 ps-5 border-2 bg-green py-1"}
            style={{ maxWidth: "20rem" }} // Set max width untuk input search agar tidak terlalu lebar
          />
        </div>
        <div className="d-flex justify-content-end mt-3 mt-md-0">
          <button
            type="button"
            onClick={() => onNavigateAdd(data)}
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
            Tambah Data
          </button>
        </div>
      </div>

      <div
        className="table-responsive table-wrapper"
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
