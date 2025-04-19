import React, { createRef, useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axiosClient from "./../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showPassCheck, setShowPassCheck] = useState(false);
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const nameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const addressRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        console.log(payload);

        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                console.log(err);
                console.log(err.response.data);
            });
    };

    return (
        <div className="register">
            <img src={assets.login} alt="" className="register-img" />
            <form className="register-container" onSubmit={onSubmit}>
                <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                <div className="register-inputs">
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Tên của bạn"
                        required
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        ref={phoneRef}
                        type="text"
                        placeholder="Số điện thoại"
                        required
                    />
                    <input
                        ref={addressRef}
                        type="text"
                        placeholder="Địa chỉ"
                        required
                    />
                    <div className="register-password">
                        <input
                            ref={passwordRef}
                            type={showPass ? "text" : "password"}
                            placeholder="Mật khẩu"
                            required
                        />
                        {showPass ? (
                            <i
                                onClick={() => setShowPass(!showPass)}
                                class="fa-solid fa-eye-slash"
                            ></i>
                        ) : (
                            <i
                                onClick={() => setShowPass(!showPass)}
                                class="fa-solid fa-eye"
                            ></i>
                        )}
                    </div>

                    <div className="register-password-check">
                        <input
                            ref={passwordConfirmationRef}
                            type={showPassCheck ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                        {showPassCheck ? (
                            <i
                                onClick={() => setShowPassCheck(!showPassCheck)}
                                class="fa-solid fa-eye-slash"
                            ></i>
                        ) : (
                            <i
                                onClick={() => setShowPassCheck(!showPassCheck)}
                                class="fa-solid fa-eye"
                            ></i>
                        )}
                    </div>
                </div>
                <button>Đăng ký</button>
                <p>
                    Bạn đã có tài khoản?{" "}
                    <span onClick={() => navigate("/login")}>Đăng nhập</span>
                </p>
            </form>
        </div>
    );
};

export default Register;
