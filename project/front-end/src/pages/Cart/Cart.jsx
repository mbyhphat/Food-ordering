import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const {
        cartItems,
        food_list,
        removeFromCart,
        getTotalCartAmount,
        loading,
        applyVoucher,
        removeVoucher,
        appliedVoucher,
        calculateDiscount,
        getFinalTotal,
    } = useContext(StoreContext);
    const navigate = useNavigate();
    const [voucherCode, setVoucherCode] = useState("");

    if (loading)
        return (
            <div className="loading-section">
                <section className="dots-container">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </section>
            </div>
        );

    const handleApplyVoucher = async () => {
        if (!voucherCode.trim()) return;
        const success = await applyVoucher(voucherCode);
    };

    // Function to handle checkout navigation
    const handleCheckout = () => {
        navigate("/order");
        window.scrollTo(0, 0); // Immediately scroll to top without smooth animation
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Sản phẩm</p>
                    <p>Món ăn</p>
                    <p>Đơn giá</p>
                    <p>Số lượng</p>
                    <p>Tổng tiền</p>
                    <p>Loại bỏ</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    console.log(cartItems);
                    if (cartItems[item.item_id] > 0) {
                        return (
                            <div key={item.item_id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={item.image_url} alt="" />
                                    <p>{item.name}</p>
                                    <p>{item.price}VND</p>
                                    <p>{cartItems[item.item_id]}</p>
                                    <p>
                                        {item.price * cartItems[item.item_id]}
                                        VND
                                    </p>
                                    <p
                                        onClick={() =>
                                            removeFromCart(item.item_id)
                                        }
                                        className="cross"
                                    >
                                        x
                                    </p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Giỏ hàng</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng tiền món ăn </p>
                            <p>{getTotalCartAmount()} VND</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Phí Giao hàng</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 20000} VND</p>
                        </div>
                        {appliedVoucher && (
                            <>
                                <hr />
                                <div className="cart-total-details">
                                    <p>
                                        Giảm giá (
                                        {appliedVoucher.discount_percentage}%){" "}
                                    </p>
                                    <p>-{calculateDiscount()} VND</p>
                                </div>
                            </>
                        )}
                        <hr />
                        <div className="cart-total-details">
                            <p>Tổng tiền</p>
                            <b>{getFinalTotal()} VND</b>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>
                        Tiến hành thanh toán
                    </button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>Nếu bạn có mã khuyến mãi hãy nhập vào đây </p>
                        <div className="cart-promocode-input">
                            <input
                                type="text"
                                placeholder="Mã khuyến mãi"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                            />
                            {appliedVoucher ? (
                                <button
                                    onClick={removeVoucher}
                                    className="remove-voucher"
                                >
                                    Hủy mã
                                </button>
                            ) : (
                                <button onClick={handleApplyVoucher}>
                                    Áp dụng
                                </button>
                            )}
                        </div>
                        {appliedVoucher && (
                            <p className="applied-voucher">
                                Đã áp dụng mã giảm giá: {appliedVoucher.code} (
                                {appliedVoucher.discount_percentage}%)
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
