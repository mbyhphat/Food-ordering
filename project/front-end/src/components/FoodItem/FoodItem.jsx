import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { useAppContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image, quantity }) => {
    const { cartItems, addToCart, removeFromCart, handleQuantityChange } =
        useContext(StoreContext);
    const { user, token } = useAppContext();

    return (
        <div>
            <div className="food-item" key="id">
                <div className="food-item-img-container">
                    <img src={image} alt="" className="food-item-img" />
                    {!cartItems[id] ? (
                        <i
                            class="fa-solid fa-plus first-add"
                            onClick={() => {
                                if (token && user.role === 0) {
                                    addToCart(id, quantity);
                                } else {
                                    toast.error(
                                        "Bạn phải đăng nhập để đặt hàng!",
                                        {
                                            autoClose: 1000,
                                            position: "top-center",
                                        }
                                    );
                                }
                            }}
                        ></i>
                    ) : (
                        <div className="food-item-counter">
                            <i
                                class="fa-solid fa-circle-minus minus"
                                onClick={() => removeFromCart(id)}
                            ></i>
                            <input
                                type="number"
                                value={cartItems[id] || 0}
                                min="0"
                                onChange={(e) =>
                                    handleQuantityChange(
                                        id,
                                        e.target.value,
                                        quantity
                                    )
                                }
                                className="cart-quantity-input"
                            />
                            <i
                                class="fa-solid fa-circle-plus next-add"
                                onClick={() => addToCart(id, quantity)}
                            ></i>
                        </div>
                    )}
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-info">
                        <p>{name}</p>
                        <i class="fa-solid fa-star custom-star"></i>
                    </div>
                    <p className="food-item-description">{description}</p>
                    <p className="food-item-price">{price}đ</p>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
