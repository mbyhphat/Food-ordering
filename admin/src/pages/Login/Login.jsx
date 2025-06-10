import React, { createRef, useState } from "react";
import { useAppContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import "./Login.css";
import { assets } from "../../assets/assets";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useAppContext();
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setSuccessMessage("Đăng nhập thành công.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.message);
        } else {
          setErrors(
            "Đã xảy ra lỗi hệ thống hoặc kết nối. Vui lòng thử lại sau."
          );
        }
      });
  };
  return (
    <div className="login">
      <img src={assets.login} alt="" className="login-img" />
      <form className="login-container" onSubmit={onSubmit} noValidate>
        <h2>ĐĂNG NHẬP</h2>
        {errors && (
          <div className="alert alert-danger" role="alert">
            <p>{errors}</p>
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            <p>{successMessage}</p>
          </div>
        )}
        <div className="login-inputs">
          <input
            type="email"
            ref={emailRef}
            placeholder="Địa chỉ email"
            required
          />
          <div className="login-password">
            <input
              type={showPass ? "text" : "password"}
              ref={passwordRef}
              placeholder="Mật khẩu"
              required
            />
            {showPass ? (
              <i
                onClick={() => setShowPass(!showPass)}
                className="fa-solid fa-eye-slash"
              ></i>
            ) : (
              <i
                onClick={() => setShowPass(!showPass)}
                className="fa-solid fa-eye"
              ></i>
            )}
          </div>
        </div>
        <button className="login-button">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
