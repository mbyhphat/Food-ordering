import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={assets.logo} alt="Logo"  className="Logo"/>
    </div>
  )
};

export default Navbar;
