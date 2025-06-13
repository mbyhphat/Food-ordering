import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useAppContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

const PlaceOrder = () => {
    const { getFinalTotal, clearCart, cartItems, food_list } =
        useContext(StoreContext);
    const { user } = useAppContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Validate cart is not empty
    useEffect(() => {
        if (Object.keys(cartItems).length === 0 || getFinalTotal() <= 0) {
            navigate("/cart");
        }
    }, [cartItems, getFinalTotal, navigate]);

    const handleVnpayPayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Lưu trữ giỏ hàng hiện tại để khôi phục nếu có lỗi
            const currentCart = { ...cartItems };

            // Xóa giỏ hàng ngay lập tức khi người dùng bấm thanh toán
            await clearCart();

            // Kiểm tra thông tin người dùng
            if (!user.name || !user.email || !user.address || !user.phone) {
                // Khôi phục giỏ hàng nếu thiếu thông tin
                await axiosClient.post("/cart", {
                    cartItems: currentCart,
                    totalAmount: getFinalTotal(),
                });
                setError("Vui lòng điền đầy đủ thông tin giao hàng!");
                return;
            }

            // Kiểm tra số tiền
            const totalAmount = getFinalTotal();
            if (totalAmount <= 0) {
                setError("Giỏ hàng trống, vui lòng thêm sản phẩm!");
                navigate("/cart");
                return;
            }

            // Tạo đơn hàng trước
            const orderData = {
                user_id: user.id,
                delivery_address: user.address,
                contact_phone: user.phone,
                total_money: totalAmount,
                cart_items: Object.entries(cartItems).map(
                    ([food_id, quantity]) => {
                        const food = food_list.find(
                            (f) => f.item_id === parseInt(food_id)
                        );
                        return {
                            food_id: parseInt(food_id),
                            quantity,
                            price: food.price,
                        };
                    }
                ),
            };

            const orderResponse = await axiosClient.post("/orders", orderData);

            if (!orderResponse.data?.order_id) {
                throw new Error("Không thể tạo đơn hàng");
            }

            // Gửi dữ liệu thanh toán đến VNPAY với thông tin đơn hàng
            const response = await axiosClient.post("/vnpay_payment", {
                amount: totalAmount,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                order_id: orderResponse.data.order_id,
            });

            // Kiểm tra response
            if (response.data && response.data.data) {
                // Xóa giỏ hàng ngay khi bắt đầu thanh toán
                await clearCart();

                // Chuyển đến trang thanh toán VNPAY
                window.location.href = response.data.data;
            } else {
                // Nếu có lỗi, cần khôi phục lại giỏ hàng
                await axiosClient.post("/cart", {
                    cartItems: cartItems,
                    totalAmount: getFinalTotal(),
                });
                throw new Error(
                    response.data?.message ||
                        "Có lỗi xảy ra khi xử lý thanh toán"
                );
            }
        } catch (error) {
            console.error("Payment error:", error);
            setError(
                error.response?.data?.message ||
                    "Có lỗi khi kết nối VNPAY! Vui lòng thử lại sau."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="place-order">
            <div className="place-order-left">
                <p className="title">Thông tin giao hàng</p>
                <div className="user-info">
                    <div className="user-name">
                        <p>Họ và tên:</p>
                        <input type="text" value={user.name} readOnly />
                    </div>
                    <div className="user-gmail">
                        <p>Gmail:</p>
                        <input type="email" value={user.email} readOnly />
                    </div>
                    <div className="user-address">
                        <p>Địa chỉ:</p>
                        <input type="text" value={user.address} readOnly />
                    </div>
                    <div className="user-phone">
                        <p>Số điện thoại:</p>
                        <input type="text" value={user.phone} readOnly />
                    </div>
                </div>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Giỏ hàng </h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng tiền món ăn </p>
                            <p>{getFinalTotal()} vnđ</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Phí giao hàng</p>
                            <p>{getFinalTotal() === 0 ? 0 : 20000} vnđ</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tổng tiền </p>
                            <b>
                                {getFinalTotal() === 0
                                    ? 0
                                    : getFinalTotal() + 20000}{" "}
                                vnđ
                            </b>
                        </div>
                    </div>
                    {error && (
                        <div
                            className="error-message"
                            style={{ color: "red", marginBottom: "10px" }}
                        >
                            {error}
                        </div>
                    )}
                    <button
                        type="button"
                        className="primary-btn checkout-btn"
                        style={{ width: "100%" }}
                        onClick={handleVnpayPayment}
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang xử lý..." : "Thanh Toán Bằng VNPAY"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
