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
        <input type="email" placeholder='Email adress' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='Stage' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code ' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Số điện thoại ' />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Tatals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()===0?0:20000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
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
