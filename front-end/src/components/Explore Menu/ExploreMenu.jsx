import React from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = () => {
  return (
    <div className="explore-menu">
      <h1>Thực đơn</h1>
      <div className="menu-category-list">
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="menu-category">
              <img src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
