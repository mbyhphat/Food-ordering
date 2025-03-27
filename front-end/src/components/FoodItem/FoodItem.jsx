import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  
  const { cartItems, addToCart, removeFromCart, handleQuantityChange } = useContext(StoreContext);
  console.log(id);
  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
          <img src={image} alt="" className="food-item-img" />
          {
            !cartItems[id]
              ? <i class="fa-solid fa-plus first-add" onClick={() => addToCart(id)}></i>
              : <div className="food-item-counter">
                <i class="fa-solid fa-circle-plus next-add" onClick={() => addToCart(id)}></i>
                <input type="number" value={cartItems[id] || 0} min="0" onChange={(e) => handleQuantityChange(id, e.target.value)} className="cart-quantity-input" />
                <i class="fa-solid fa-circle-minus minus" onClick={() => removeFromCart(id)}></i>
                </div>
          }
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
  )
};

export default FoodItem;