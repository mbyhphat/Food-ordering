import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useAppContext } from "../../context/ContextProvider";

const PlaceOrder = () => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const { user } = useAppContext();

    return (
        <form className="place-order">
            <div className="place-order-left">
                <p className="title">Thông tin giao hàng</p>
                <div className="user-info">
                    <div className="user-name">
                        <p>Họ và tên:</p>
                        <input type="text" value={user.name} />
                    </div>
                    <div className="user-gmail">
                        <p>Gmail:</p>
                        <input type="email" value={user.email} />
                    </div>
                    <div className="user-address">
                        <p>Địa chỉ:</p>
                        <input type="text" value={user.address} />
                    </div>
                    <div className="user-phone">
                        <p>Số điện thoại:</p>
                        <input type="text" value={user.phone} />
                    </div>
                </div>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Giỏ hàng </h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng tiền món ăn </p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Phí giao hàng</p>
                            <p>{20000}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tổng tiền </p>
                            <b>
                                {getTotalCartAmount() === 0
                                    ? 20000
                                    : getTotalCartAmount() + 20000}
                            </b>
                        </div>
                    </div>
                    <button>Thanh toán </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;