import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Menu");

  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="logo" />
      <ul className="navbar-menu">
        <li onClick={() => {
          setMenu("Home");
          navigate("/");
        }} className={menu === "Home" ? "active" : ""}>Home </li>
        <li onClick={() => {
          setMenu("Menu");
          navigate("/menu");
        }} className={menu === "Menu" ? "active" : ""}>Menu </li>
        <li onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app </li>
        <li onClick={() => setMenu("Contact us")} className={menu === "Contact us" ? "active" : ""}>Contact us  </li>
      </ul>
      <div className="navbar-right">
        <i class="fa-solid fa-magnifying-glass"></i>
        <div className="navbar-search-icon">
          <i class="fa-solid fa-cart-shopping"></i>
          <div className="dot"></div>
        </div>
        <button onClick={() => { navigate("/login") }}>Đăng nhập</button>

      </div>
    </div>
  )
};

export default NavBar;
