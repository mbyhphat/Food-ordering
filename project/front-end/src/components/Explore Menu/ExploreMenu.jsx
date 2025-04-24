import React from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="explore-menu">
            <h1>Thực đơn</h1>
            <div className="menu-category-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            onClick={() =>
                                setCategory(
                                    category === item.menu_name
                                        ? "All"
                                        : item.menu_name
                                )
                            }
                            key={index}
                            className="menu-category"
                        >
                            <img
                                className={
                                    category === item.menu_name ? "active" : ""
                                }
                                src={item.menu_image}
                                alt=""
                            />
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
