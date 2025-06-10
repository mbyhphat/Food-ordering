import React, { createRef, useState } from "react";
import { assets } from "../../assets/assets";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
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

        if (selectedRole === "admin") {
            window.open("http://localhost:5173/login", "_self");
            return;
        }

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

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        if (role === "admin") {
            window.open("http://localhost:5173/login", "_self");
        } else {
            setShowLoginForm(true);
        }
    };

    return (
        <div className="login">
            <img src={assets.login} alt="" className="login-img" />
            {!showLoginForm ? (
                <div className="login-container role-selection">
                    <h2>Chọn vai trò của bạn</h2>
                    <div className="role-buttons">
                        <button
                            className="login-button"
                            onClick={() => handleRoleSelect("user")}
                        >
                            Người dùng
                        </button>
                        <button
                            className="login-button"
                            onClick={() => handleRoleSelect("admin")}
                        >
                            Quản trị viên
                        </button>
                    </div>
                </div>
            ) : (
                <form
                    className="login-container"
                    onSubmit={onSubmit}
                    noValidate
                >
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
                    <p>
                        Bạn chưa có tài khoản?{" "}
                        <span onClick={() => navigate("/register")}>
                            Đăng ký ngay
                        </span>
                    </p>
                </form>
            )}
        </div>
    );
};

export default Login;
