import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="Logo" />
      <ul className="navbar-menu"> </ul>
      <li>Home </li>
      <li>menu </li>
      <li>Mobile-app </li>
      <li>Contact us  </li>
      
    </div>
  )
};

export default NavBar;
