import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img className="logo" src={assets.logo} alt="" />
        <img className="profile" src={assets.Phat} alt="" />
      </div>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Navbar;
