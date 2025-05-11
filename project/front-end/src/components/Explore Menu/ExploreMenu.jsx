import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

const ExploreMenu = ({ category, setCategory }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axiosClient
            .get("/category")
            .then(({ data }) => {
                setCategories(data.data);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    toast.error(response.data.message);
                }
            });
    }, []);

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Thực đơn</h1>
            <div className="menu-category-list">
                {categories.map((item, index) => {
                    const categoryName = item.name;
                    const categoryImage = item.image_url;

                    return (
                        <div
                            onClick={() =>
                                setCategory(
                                    category === categoryName
                                        ? "All"
                                        : categoryName
                                )
                            }
                            key={index}
                            className="menu-category"
                        >
                            <img
                                className={
                                    category === categoryName ? "active" : ""
                                }
                                src={categoryImage}
                                alt=""
                            />
                            <p>{categoryName}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;
