import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios-client";
import { useAppContext } from "./ContextProvider";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAppContext();
    const [cartItems, setCartItems] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem("USER_INFO"));
        if (storedUser?.id) {
            const savedCart = localStorage.getItem(`ORDER_${storedUser.id}`);
            console.log(localStorage);
            return savedCart ? JSON.parse(savedCart) : {};
        }
        return {};
    });

    useEffect(() => {
        fetchFoodData();
    }, []);

    // Save order to localStorage whenever it changes
    useEffect(() => {
        if (user?.id) {
            localStorage.setItem(`ORDER_${user.id}`, JSON.stringify(cartItems));
            console.log(localStorage);
            console.log(cartItems);
        }
    }, [cartItems, user]);

    useEffect(() => {
        if (!user?.id) {
            setCartItems({});
        }
    }, [user]);

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
                    (product) => product.item_id === parseInt(item)
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
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
