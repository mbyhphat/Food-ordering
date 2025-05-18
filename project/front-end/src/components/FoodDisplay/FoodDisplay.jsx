import React, { useContext } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";

const FoodDisplay = ({ category }) => {
    const { food_list, loading } = useContext(StoreContext);

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
                    {food_list.map((item, index) => {
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
                                    quantity={item.quantity}
                                />
                            );
                    })}
                </div>
            )}
        </div>
    );
};

export default FoodDisplay;
