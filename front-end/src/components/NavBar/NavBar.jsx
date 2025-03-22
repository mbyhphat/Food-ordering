import React from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="Logo" />
      <ul className="navbar-menu"> 
      <li>Home </li>
      <li>Menu </li>
      <li>Mobile-app </li>
      <li>Contact us  </li>
      </ul>
      <div className="navbar-right">
        <i class="fa-solid fa-magnifying-glass"></i>
        <i class="fa-solid fa-cart-shopping"></i>
        <i class="fa-solid fa-user"></i>
      </div>
      
    </div>
  )
};

export default NavBar;
