import React, { useEffect, useState } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

const FoodDisplay = ({ category }) => {
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/food")
            .then(({ data }) => {
                setFood(data.data);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    toast.error(response.data.message);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="food-display" id="food-display">
            <h2>Danh sách món ăn</h2>
            {loading ? (
                <section class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </section>
            ) : (
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
            )}
        </div>
    );
};

export default FoodDisplay;
