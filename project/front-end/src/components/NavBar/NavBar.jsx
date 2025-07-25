import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useAppContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

const NavBar = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("Menu");
    const profileRef = useRef();
    const [profile, setProfile] = useState(false);
    const { token, setUser, setToken } = useAppContext();
    const { getTotalCart } = useContext(StoreContext);

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
            toast.info("Bạn đã đăng xuất khỏi ứng dụng!", {
                autoClose: 1500,
            });
        });
    };

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Function to handle cart navigation
    const handleCartClick = (e) => {
        e.preventDefault();
        navigate("/cart");
        window.scrollTo(0, 0); // Immediately scroll to top without smooth animation
    };

    // Đóng menu nếu click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="navbar" id="navbar">
            <Link to="/" onClick={scrollToTop}>
                <img src={assets.logo} alt="Logo" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <li
                    onClick={() => {
                        setMenu("Home");
                        navigate("/");
                        scrollToTop();
                    }}
                    className={menu === "Home" ? "active" : ""}
                >
                    Trang chủ
                </li>
                <li
                    onClick={() => {
                        setMenu("Menu");
                        navigate("/menu");
                        scrollToTop();
                    }}
                    className={menu === "Menu" ? "active" : ""}
                >
                    Thực đơn
                </li>
                <li
                    onClick={() => {
                        setMenu("Mobile-app");
                        // Đảm bảo về trang chủ trước nếu đang ở trang khác
                        if (window.location.pathname !== "/") {
                            navigate("/");
                            // Đợi trang load xong rồi scroll
                            setTimeout(() => {
                                const commentSection =
                                    document.getElementById("comment");
                                if (commentSection) {
                                    commentSection.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }, 300);
                        } else {
                            // Nếu đã ở trang chủ thì scroll ngay
                            const commentSection =
                                document.getElementById("comment");
                            if (commentSection) {
                                commentSection.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                        }
                    }}
                    className={menu === "Mobile-app" ? "active" : ""}
                >
                    Nhận xét của khách hàng
                </li>
                <li
                    onClick={() => {
                        setMenu("Contact us");
                        const footer = document.getElementById("footer");
                        if (footer) {
                            footer.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className={menu === "Contact us" ? "active" : ""}
                >
                    Liên hệ
                </li>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <a href="/cart" onClick={handleCartClick}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </a>
                    <div className={getTotalCart() === 0 ? "" : "dott"}>
                        {getTotalCart() > 0 && getTotalCart()}
                    </div>
                </div>
                <div>
                    {token ? (
                        <div className="profile-container" ref={profileRef}>
                            <i
                                className="fa-solid fa-circle-user"
                                onClick={() => setProfile(!profile)}
                            ></i>
                            {profile && (
                                <div className="profile-dropdown">
                                    <ul>
                                        <li>Thông tin cá nhân</li>
                                        <li onClick={onLogout}>Đăng xuất</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => navigate("/login")}>
                            Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
