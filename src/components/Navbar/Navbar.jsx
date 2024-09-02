import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import { navTitle } from "../../utils/dataObj";
import Logo from "../../assets/images/logo-only.png";

export default function Navbar() {
  // Buat render title dan content secara dinamis berdasarkan rute
  const location = useLocation();
  const currentRoute = location.pathname.split("/")[1];
  const currentNav = navTitle.find((item) => item.route === currentRoute);
  const [modalNotif, setModalNotif] = useState(false);

  return (
    <header className={styles.navbar}>
      <nav className="d-flex w-100 justify-content-between align-items-center py-4 py-md-0">
        <div>
          <h5 className="fw-semibold m-0">
            {currentNav ? currentNav.title : null}
          </h5>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <div className="d-flex align-items-center pe-3 pe-md-0 gap-3">
            <div className=" d-none d-lg-block">
              <UserProfile />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        avatar: "assetsimagesIconProfile.svg",
        // name: "Admin SMK",
        role: "Admin",
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <figure className="m-0 d-inline-flex gap-2 align-items-center">
      {loading ? (
        // Menampilkan teks loading atau null sementara data dimuat
        <p>Loading...</p>
      ) : (
        <>
          {/* <img src={Logo} alt="Avatar" width={60} height={42} /> */}
          <div>
            <p className="m-0 fs-3">{userData.name}</p>
            <p className="m-0">{userData.role}</p>
          </div>
        </>
      )}
    </figure>
  );
};
