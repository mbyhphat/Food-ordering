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
    const { getTotalCartAmount } = useContext(StoreContext);
    const profileRef = useRef();
    const [profile, setProfile] = useState(false);
    const { token, setUser, setToken } = useAppContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            toast.info("Bạn đã đăng xuất khỏi ứng dụng!", {
                autoClose: 1500,
            });
        });
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
            <Link to="/">
                <img src={assets.logo} alt="Logo" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <li
                    onClick={() => {
                        setMenu("Home");
                        navigate("/");
                    }}
                    className={menu === "Home" ? "active" : ""}
                >
                    {/* {" "} */}
                    Home{" "}
                </li>
                <li
                    onClick={() => {
                        setMenu("Menu");
                        navigate("/menu");
                    }}
                    className={menu === "Menu" ? "active" : ""}
                >
                    Menu{" "}
                </li>
                <li
                    onClick={() => setMenu("Mobile-app")}
                    className={menu === "Mobile-app" ? "active" : ""}
                >
                    {" "}
                    Mobile-app{" "}
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
                    Contact us
                </li>
            </ul>
            <div className="navbar-right">
                <i class="fa-solid fa-magnifying-glass"></i>
                <div className="navbar-search-icon">
                    <Link to={"/cart"}>
                        {" "}
                        <i class="fa-solid fa-cart-shopping"></i>
                    </Link>
                    <div
                        className={getTotalCartAmount() === 0 ? "" : "dot"}
                    ></div>
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
