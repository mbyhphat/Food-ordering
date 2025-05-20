import React, { useContext, useState } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useAppContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

const PlaceOrder = () => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const { user } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVnpayPayment = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Kiểm tra thông tin người dùng
            if (!user.name || !user.email || !user.address || !user.phone) {
                setError("Vui lòng điền đầy đủ thông tin giao hàng!");
                return;
            }

            // Kiểm tra số tiền
            const totalAmount = getTotalCartAmount() + 20000;
            if (totalAmount <= 0) {
                setError("Giỏ hàng trống, vui lòng thêm sản phẩm!");
                return;
            }

            // Gửi dữ liệu thanh toán với key rõ ràng hơn
            const response = await axiosClient.post("/vnpay_payment", {
                amount: totalAmount, // Đổi key từ '1000' thành 'amount'
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
            });

            // Kiểm tra response
            if (response.data && response.data.data) {
                window.location.href = response.data.data;
            } else {
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
                            <p>{getTotalCartAmount()} vnđ</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Phí giao hàng</p>
                            <p>{20000} vnđ</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tổng tiền </p>
                            <b>
                                {getTotalCartAmount() === 0
                                    ? 20000
                                    : getTotalCartAmount() + 20000}{" "}
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
