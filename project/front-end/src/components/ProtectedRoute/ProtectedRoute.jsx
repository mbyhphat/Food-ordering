import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import "./ProtectedRoute.css";

export const ProtectedRoute = ({ children }) => {
    const { token } = useAppContext();

    if (!token) {
        // Show a message that login is required
        toast.warn("Vui lòng đăng nhập để truy cập trang này.", {
            position: "top-center",
            autoClose: 3000,
        });

        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export const RoleBasedRoute = ({ children }) => {
    const { user } = useAppContext();
    const currentHost = window.location.host;

    // Check if user is admin (role is not 0)
    const isAdmin = user && user.role !== 0;

    // Admin can only access admin site (localhost:5173)
    if (isAdmin && currentHost === "localhost:3000") {
        // Show message before redirect
        toast.info("Chuyển hướng đến trang quản trị...", {
            position: "top-center",
            autoClose: 2000,
        });

        // Add a slight delay before redirecting
        setTimeout(() => {
            window.location.href = "http://localhost:5173";
        }, 2000);

        return <div className="loading-redirect">Đang chuyển hướng...</div>;
    }

    // Regular users can only access user site (localhost:3000)
    if (!isAdmin && currentHost === "localhost:5173") {
        // Show message before redirect
        toast.info("Chuyển hướng đến trang người dùng...", {
            position: "top-center",
            autoClose: 2000,
        });

        // Add a slight delay before redirecting
        setTimeout(() => {
            window.location.href = "http://localhost:3000";
        }, 2000);

        return <div className="loading-redirect">Đang chuyển hướng...</div>;
    }

    return children;
};

export default ProtectedRoute;
