import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="Logo" />
      <ul className="navbar-menu"> 
      <li>Home  <i class="fa-solid fa-magnifying-glass"></i></li>
      <li>menu </li>
      <li>Mobile-app </li>
      <li>Contact us  </li>
      </ul>
      
      
    </div>
  )
};

export default NavBar;
