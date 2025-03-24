import React, {useState} from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {

  const [menu, Setmenu] = useState("Home"); 

  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="logo" />
      <ul className="navbar-menu"> 
      <li className={menu==="Home"?"active":""}>Home </li>
      <li className={menu==="Menu"?"active":""}>Menu </li>
      <li className={menu==="Mobile-app"?"active":""}>Mobile-app </li>
      <li className={menu==="Contact us"?"active":""}>Contact us  </li>
      </ul>
      <div className="navbar-right">
        <i class="fa-solid fa-magnifying-glass"></i>
        <div className="navbar-search-icon">
          <i class="fa-solid fa-cart-shopping"></i>
          <div className="dot"></div>
        </div>
        <button>Đăng nhập</button>
      </div>
      
    </div>
  )
};

export default NavBar;
