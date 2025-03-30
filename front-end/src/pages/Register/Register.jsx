import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
import "./Register.css"

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassCheck, setShowPassCheck] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="register">
      <img src={assets.login} alt="" className="register-img" />
      <form className="register-container">
        <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
        <div className="register-inputs">
          <input type="text" placeholder='Tên của bạn' required />
          <input type="text" placeholder='Tên đăng nhập' required />
          <div className="register-password">
            <input type={showPass ? "text" : "password"} placeholder='Mật khẩu' required />
            {showPass
              ? <i onClick={() => setShowPass(!showPass)} class="fa-solid fa-eye"></i>
              : <i onClick={() => setShowPass(!showPass)} class="fa-solid fa-eye-slash"></i>}
          </div>

          <div className="register-password-check">
            <input type={showPassCheck ? "text" : "password"} placeholder='Nhập lại mật khẩu' required />
            {showPassCheck
              ? <i onClick={() => setShowPassCheck(!showPassCheck)} class="fa-solid fa-eye"></i>
              : <i onClick={() => setShowPassCheck(!showPassCheck)} class="fa-solid fa-eye-slash"></i>}
          </div>
        </div>
        <button>Đăng ký</button>
        <p>Bạn đã có tài khoản? <span onClick={() => navigate("/login")}>Đăng nhập</span></p>
      </form>
    </div>
  )
}

export default Register