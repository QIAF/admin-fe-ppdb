import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

import { sides } from "../../utils/dataObj";
import Tranparent from "../UI/Button/Tranparent";
import CustomModal from "../UI/Modal/Modal";
import LogoutIcon from "../../assets/images/Icon-Lg.svg";
import Logoutlg from "../../assets/images/logout-large.svg";
import LogoSmk from "../../assets/images/logo-smk.svg";
import Button from "../UI/Button/Button";

export default function Sidebar() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <aside className="sidebar">
        <figure className="figure d-flex">
          <img src={LogoSmk} width={"250px"} alt="SMK 3" />
        </figure>

        {/* Container list navigasi */}
        <ul className="list-group gap-2 mt-3">
          {sides?.map((item, index) => {
            return (
              <li key={index} className={`list-unstyled`}>
                <NavLink to={item.link} className="text-decoration-none">
                  {({ isActive }) => (
                    <div
                      className={`${
                        isActive && "btn-primary text-white"
                      } text-primary d-flex navBtn btn`}
                    >
                      <img
                        src={isActive ? item.icon2 : item.icon}
                        width={"24"}
                        alt={item.label}
                      />
                      {item.label}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() => setModal(true)}
          className="logoutBtn mt-3 text-primary d-flex btn"
        >
          <p>Logout</p>
          <img src={LogoutIcon} alt="Logout" />
        </Button>

        {/* Modal Logout */}
        {modal && (
          <Tranparent disabled={true} className="min-vw-100">
            <CustomModal
              icon={Logoutlg}
              title={"Keluar?"}
              // content={
              //   "Ingin beristirahat sejenak? keluar dan nikmati waktu Anda."
              // }
              confirmAction={handleLogout}
              cancelAction={() => setModal(false)}
            />
          </Tranparent>
        )}
      </aside>
    </>
  );
}
