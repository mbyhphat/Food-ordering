import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import "./Login.css"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate();

  return (
    <div className="login">
      <img src={assets.login} alt="" className="login-img" />
      <form className="login-container">
        <h2>ĐĂNG NHẬP</h2>
        <div className="login-inputs">
          <input type="text" placeholder='Tên đăng nhập' required />
          <div className="login-password">
            <input type={showPass?"text":"password"} placeholder='Mật khẩu' required />
            {showPass 
            ? <i onClick={() => setShowPass(!showPass)} class="fa-solid fa-eye"></i> 
            : <i onClick={() => setShowPass(!showPass)} class="fa-solid fa-eye-slash"></i>}
          </div>
        </div>
        <button>Đăng nhập</button>
        <p>Bạn chưa có tài khoản? <span onClick={navigate("/register")}>Đăng ký ngay</span></p>
      </form>
    </div>
  )
}

export default Login