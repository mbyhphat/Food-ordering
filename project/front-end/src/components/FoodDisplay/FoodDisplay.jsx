import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import axiosClient from "../../axios-client";

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    useEffect(() => {});

    return (
        <div className="food-display" id="food-display">
            <h2>Danh sách món ăn</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (
                        category.toLowerCase() === "all" ||
                        category === item.category
                    )
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                image={item.image}
                            />
                        );
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
