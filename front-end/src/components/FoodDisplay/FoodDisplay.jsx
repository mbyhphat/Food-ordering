import React, { useContext } from 'react'
import { food_list } from './../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Danh sách món ăn</h2>
      <div className="food-display-list">
        {food_list.map((item,index) => {
          return <FoodItem key={index} id={item.id} name={item.name} price={item.price} description={item.description} image={item.image} />
        })}
      </div>
    </div>
  )
};

export default FoodDisplay;