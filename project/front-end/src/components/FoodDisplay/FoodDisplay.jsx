import React, { useEffect, useState } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import axiosClient from "../../axios-client";

const FoodDisplay = ({ category }) => {
    const [food, setFood] = useState([]);

    useEffect(() => {
        axiosClient.get("/food").then(({ data }) => {
            setFood(data.data);
        });
    }, []);

    return (
        <div className="food-display" id="food-display">
            <h2>Danh sách món ăn</h2>
            <div className="food-display-list">
                {food.map((item, index) => {
                    if (
                        category.toLowerCase() === "all" ||
                        category === item.category_name
                    )
                        return (
                            <FoodItem
                                key={index}
                                id={item.item_id}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                image={item.image_url}
                            />
                        );
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
