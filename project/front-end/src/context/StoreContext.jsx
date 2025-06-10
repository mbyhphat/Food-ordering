import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios-client";
import { useAppContext } from "./ContextProvider";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAppContext();
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        fetchFoodData();
    }, []);

    useEffect(() => {
        if (user?.id) {
            fetchCartData();
        } else {
            setCartItems({});
        }
    }, [user]);

    const fetchCartData = async () => {
        try {
            const { data } = await axiosClient.get("/cart");
            setCartItems(data.cart || {});
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    const saveCartToServer = async (newCartItems) => {
        if (user?.id) {
            try {
                // Calculate total amount before saving
                let totalAmount = 0;
                for (const itemId in newCartItems) {
                    if (newCartItems[itemId] > 0) {
                        const itemInfo = food_list.find(
                            (product) => product.item_id === parseInt(itemId)
                        );
                        if (itemInfo) {
                            totalAmount +=
                                itemInfo.price * newCartItems[itemId];
                        }
                    }
                }

                await axiosClient.post("/cart", {
                    cartItems: newCartItems,
                    totalAmount: totalAmount,
                });
            } catch (err) {
                console.error("Error saving cart:", err);
                toast.error("Failed to save cart to server", {
                    autoClose: 1000,
                    position: "top-center",
                });
            }
        }
    };

    const fetchFoodData = async () => {
        try {
            setLoading(true);
            const { data } = await axiosClient.get("/food");
            await new Promise((res) => setTimeout(res, 1500)); // Delay để thấy loading
            setFoodList(data.data);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.error(response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (itemId, maxQuantity) => {
        setCartItems((prev) => {
            const newQuantity = (prev[itemId] || 0) + 1;

            if (newQuantity > maxQuantity) {
                toast.error(
                    "Rất tiếc, cửa hàng không còn đủ số lượng món ăn mà bạn muốn đặt!",
                    {
                        autoClose: 1000,
                        position: "top-center",
                    }
                );
                return prev;
            }

            const newCart = {
                ...prev,
                [itemId]: newQuantity,
            };

            saveCartToServer(newCart);
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
            saveCartToServer(newCart);
            return newCart;
        });
    };

    const clearCart = async () => {
        if (user?.id) {
            try {
                await axiosClient.delete("/cart");
            } catch (err) {
                console.error("Error clearing cart:", err);
            }
        }
        setCartItems({});
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let intemInfo = food_list.find(
                    (product) => product.item_id === parseInt(item)
                );
                totalAmount += intemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const handleQuantityChange = (itemId, value, quantity, chat = false) => {
        const newQuantity = parseInt(value, 10); // Convert input (string) to a number
        console.log("newQuantity:", newQuantity);
        console.log("quantity:", quantity);
        if (isNaN(newQuantity) || newQuantity < 0) return; // Prevent invalid input (Nan when input="abc")
        if (newQuantity > quantity) {
            if (!chat) {
                toast.error(
                    "Rất tiếc, cửa hàng không còn đủ số lượng món ăn mà bạn muốn đặt!",
                    {
                        autoClose: 1000,
                        position: "top-center",
                    }
                );
            }
            // For chat, just ignore if not enough stock
            return;
        }

        setCartItems((prev) => {
            const newCart = { ...prev, [itemId]: newQuantity };
            saveCartToServer(newCart);
            return newCart;
        });
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

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        handleQuantityChange,
        getTotalCartAmount,
        loading,
        getTotalCart, // thêm dòng này để export hàm ra context
        clearCart,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
