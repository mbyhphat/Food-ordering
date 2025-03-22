import React from "react";
import { menu_list } from "../../assets/assets";
import { assets } from "./../../assets/assets";

const ExploreMeu = () => {
  return (
    <div className="explore-menu">
      <h1>Thực đơn</h1>
      <div>
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="menu-category">
              <img src={item.menu_image} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMeu;
