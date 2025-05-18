import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate();
  
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
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}VND</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}VND</p>
                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
              </div>  
              )
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
              <p>Phí ship</p>
              <p>{getTotalCartAmount()===0?0:20000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng tiền</p>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+20000}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>Tiến hành thanh toán</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã khuyến mãi hãy nhập vào đây </p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Mã khuyến mãi '/>
              <button>Nộp </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart