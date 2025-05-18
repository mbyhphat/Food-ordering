import React, { use, useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'

    
const PlaceOrder = () => {

    const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <form className="place-order">
      <div className='place-order-left'>
        <p className="title">
          Thông tin giao hàng  
        </p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Gmail' />
        <input type="text" placeholder='Địa chỉ ' />
        <input type="text" placeholder='Số điện thoại ' />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Giỏ hàng </h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng tiền món ăn  </p>
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
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+20000}</b>
            </div>
          </div>
          <button >Thanh toán </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
