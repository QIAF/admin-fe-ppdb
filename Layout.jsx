import React, { useState } from "react";
import Button from "./src/components/UI/Button/Button";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import Navbar from "./src/components/Navbar/Navbar";
import Tranparent from "./src/components/UI/Button/Tranparent";
import Sidebar from "./src/components/Sidebar/Sidebar";
import MenuIcon from "./src/assets/images/MenuIcon.png";

const MemoizedSidebar = React.memo(Sidebar);
const MemoizedNavbar = React.memo(Navbar);

export default function Layout() {
  const [menu, setMenu] = useState(false);
  return (
    <main className="h-100 d-flex flex-row">
      <div className="d-none d-md-flex">
        <MemoizedSidebar />
      </div>

      <div className="drawer-content">
        <div className="d-flex justify-content-between align-items-center mx-4 mx-md-0 shadow-sm">
          <MemoizedNavbar />
          <Button
            className={"p-0 d-flex d-md-none"}
            onClick={() => setMenu(!menu)}
          >
            <img src={MenuIcon} alt="Menu" />
          </Button>
        </div>

        {menu && (
          <div className="position-fixed d-flex d-md-none z-50 w-full h-100">
            <Tranparent onClick={() => setMenu(false)}>
              <MemoizedSidebar />
            </Tranparent>
          </div>
        )}
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          closeButton={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Outlet />
      </div>
    </main>
  );
}
