import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let intemInfo = food_list.find(
                    (product) => product._id === item
                );
                totalAmount += intemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCart = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                total += cartItems[item];
            }
        }
        return total;
    };

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
        handleQuantityChange,
        getTotalCartAmount,
        getTotalCart, // thêm dòng này để export hàm ra context
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
