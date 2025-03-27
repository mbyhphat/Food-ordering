import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems,setCartItems] = useState({})

  const addToCart = (itemId) => {
    if(!cartItems[itemId])
    {
      setCartItems((prev) => ({...prev,[itemId]:1}))
    }
    else
    {
      setCartItems((prev) => ({...prev,[itemId]:prev[itemId] + 1}))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId] - 1}))
  }

  const handleQuantityChange = (itemId, value) => {
    const newQuantity = parseInt(value, 10); // Convert input (string) to a number

    if (isNaN(newQuantity) || newQuantity < 0) return; // Prevent invalid input (Nan when input="abc")

    setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    handleQuantityChange
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
};

export default StoreContextProvider;