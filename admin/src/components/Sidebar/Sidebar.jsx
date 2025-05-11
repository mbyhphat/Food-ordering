import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option ">
          <img src={assets.add_icon} alt="" />
          <p>Thêm thư mục </p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option ">
          <img src={assets.list_item} alt="" />
          <p>Danh sách thư mục  </p>
        </NavLink >
        <NavLink to='/orders' className="sidebar-option ">
          <img className='order' src={assets.order_icon} alt="" />
          <p>Đặt hàng  </p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar