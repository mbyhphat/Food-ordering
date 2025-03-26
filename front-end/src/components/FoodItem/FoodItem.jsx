import React from 'react'
import './FoodItem.css'

const FoodItem = ({id, name, price, description, image}) => {
  return (
    <div>
      <div className="food-item">
        <div className="food-item-img-container">
          <img src={image} alt="" className="food-item-img" />
        </div>
        <div className="food-item-info">
          <div className="food-item-name-info">
            <p>{name}</p>
            {/* rating here */}
          </div>
          <p className="food-item-description">{description}</p>
          <p className="food-item-price">{price}đ</p>
        </div>
      </div>
    </div>
  )
};

export default FoodItem;