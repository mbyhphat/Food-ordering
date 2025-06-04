import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="layout-container" style={{ display: "flex" }}>
      <Sidebar />
      <div className="content" style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
