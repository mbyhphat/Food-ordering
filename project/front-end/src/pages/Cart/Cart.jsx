import React, { useContext } from "react";
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
    } = useContext(StoreContext);
    const navigate = useNavigate();
    if (loading)
        return (
            <div className="loading-section">
                <section class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </section>
            </div>
        );

    // Function to handle checkout navigation
    const handleCheckout = () => {
        navigate("/order");
        window.scrollTo(0, 0); // Immediately scroll to top without smooth animation
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
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
                    <h2>Cart Tatals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng tiền món ăn </p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Phí Giao hàng</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 20000}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tổng tiền</p>
                            <b>
                                {getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 20000}
                            </b>
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
                            <input type="text" placeholder="Mã khuyến mãi " />
                            <button>Nộp </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
