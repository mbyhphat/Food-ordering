import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId, maxQuantity) => {
        setCartItems((prev) => {
            const newQuantity = (prev[itemId] || 0) + 1;

            // Kiểm tra số lượng ngay tại đây
            if (newQuantity > maxQuantity) {
                toast.error(
                    "Rất tiếc, cửa hàng không còn đủ số lượng món ăn mà bạn muốn đặt!",
                    {
                        autoClose: 1000,
                        position: "top-center",
                    }
                );
                // Trả về state cũ nếu vượt quá số lượng
                return prev;
            }

            // Nếu ok thì cập nhật state mới
            return {
                ...prev,
                [itemId]: newQuantity,
            };
        });
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

    const handleQuantityChange = (itemId, value, quantity) => {
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
        const newQuantity = parseInt(value, 10); // Convert input (string) to a number

        if (isNaN(newQuantity) || newQuantity < 0) return; // Prevent invalid input (Nan when input="abc")
        if (newQuantity > quantity) {
            toast.error(
                "Rất tiếc, cửa hàng không còn đủ số lượng món ăn mà bạn muốn đặt!",
                {
                    autoClose: 1000,
                    position: "top-center",
                }
            );
            return;
        }

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
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
