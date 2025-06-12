import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios-client";
import { useAppContext } from "./ContextProvider";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAppContext();
    const [cartItems, setCartItems] = useState({});
    const [appliedVoucher, setAppliedVoucher] = useState(null);

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
                // toast.error("Failed to save cart to server", {
                //     autoClose: 1000,
                //     position: "top-center",
                // });
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

    const getTotalCartAmount = useCallback(() => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(
                    (product) => product.item_id === parseInt(item)
                );
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }, [cartItems, food_list]);

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

    const applyVoucher = async (code) => {
        try {
            const response = await axiosClient.get(`/promotions?code=${code}`);
            const vouchers = response.data;

            if (!vouchers || vouchers.length === 0) {
                toast.error("Mã giảm giá không hợp lệ");
                return false;
            }

            const voucher = vouchers.find((v) => v.code === code);
            if (!voucher) {
                toast.error("Mã giảm giá không hợp lệ");
                return false;
            }

            const now = new Date();
            const startDate = new Date(voucher.start_date);
            const endDate = new Date(voucher.end_date);

            if (now < startDate || now > endDate) {
                toast.error("Mã giảm giá đã hết hạn hoặc chưa có hiệu lực");
                return false;
            }

            const cartTotal = getTotalCartAmount();
            if (cartTotal < voucher.min_order_value) {
                toast.error(
                    `Đơn hàng tối thiểu ${voucher.min_order_value}đ để áp dụng mã này`
                );
                return false;
            }

            setAppliedVoucher(voucher);
            toast.success("Áp dụng mã giảm giá thành công!");
            return true;
        } catch (error) {
            console.error("Voucher error:", error);
            toast.error("Có lỗi xảy ra khi áp dụng mã giảm giá");
            return false;
        }
    };

    const removeVoucher = () => {
        setAppliedVoucher(null);
    };

    const calculateDiscount = () => {
        if (!appliedVoucher) return 0;
        const cartTotal = getTotalCartAmount();
        return Math.round(
            (cartTotal * appliedVoucher.discount_percentage) / 100
        );
    };

    const getFinalTotal = () => {
        const cartTotal = getTotalCartAmount();
        const deliveryFee = cartTotal === 0 ? 0 : 20000;
        const discount = calculateDiscount();
        return cartTotal + deliveryFee - discount;
    };

    const validateVoucherConditions = useCallback(() => {
        if (!appliedVoucher) return;

        const cartTotal = getTotalCartAmount();
        const now = new Date();
        const startDate = new Date(appliedVoucher.start_date);
        const endDate = new Date(appliedVoucher.end_date);

        if (
            now < startDate ||
            now > endDate ||
            cartTotal < appliedVoucher.min_order_value
        ) {
            setAppliedVoucher(null);
            toast.warning(
                "Mã giảm giá đã bị gỡ bỏ do không còn thỏa điều kiện áp dụng"
            );
        }
    }, [appliedVoucher, getTotalCartAmount]);

    // Monitor cart changes
    useEffect(() => {
        validateVoucherConditions();
    }, [cartItems, validateVoucherConditions]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        handleQuantityChange,
        getTotalCartAmount,
        loading,
        getTotalCart,
        clearCart,
        applyVoucher,
        removeVoucher,
        appliedVoucher,
        calculateDiscount,
        getFinalTotal,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
