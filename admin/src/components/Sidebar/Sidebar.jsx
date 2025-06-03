import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add_category" className="sidebar-option ">
          <img src={assets.add_icon} alt="" />
          <p>Thêm danh mục món ăn </p>
        </NavLink>
        <NavLink to="/list_category" className="sidebar-option ">
          <img src={assets.list_item} alt="" />
          <p>Danh sách danh mục món ăn </p>
        </NavLink>
        <NavLink to="/add_food" className="sidebar-option ">
          <img src={assets.add_icon} alt="" />
          <p>Thêm món ăn </p>
        </NavLink>
        <NavLink to="/list_food" className="sidebar-option ">
          <img src={assets.list_item} alt="" />
          <p>Danh sách món ăn </p>
        </NavLink>
        <NavLink to="/voucher" className="sidebar-option ">
          <img className="order" src={assets.voucher} alt="" />
          <p>Mã giảm giá </p>
        </NavLink>
        <NavLink to="/analytis" className="sidebar-option ">
          <img className="order" src={assets.thongke} alt="" />
          <p>Thống kê biểu đồ </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
