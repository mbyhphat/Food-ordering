import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
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
    const { token } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {        const checkUserAccess = async () => {
            try {
                // Use the status endpoint to check user permissions
                const response = await axiosClient.get("/user-status");
                const { authenticated, isAdmin, onCorrectPortal, redirectUrl } = response.data;
                
                if (authenticated && !isAdmin && onCorrectPortal) {
                    setIsAuthorized(true);
                } else if (redirectUrl) {
                    toast.info("Đang chuyển hướng...", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 2000);
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(false);
                }
                setLoading(false);
            } catch (error) {
                console.error("Authorization error:", error);
                setIsAuthorized(false);
                setLoading(false);
            }
        };
        
        if (token) {
            checkUserAccess();
        } else {
            setLoading(false);
            setIsAuthorized(false);
        }
    }, [token]);
    
    if (loading) {
        return <div className="loading-redirect">Đang kiểm tra quyền truy cập...</div>;
    }    if (!isAuthorized) {
        // The axios interceptor will handle redirects based on server response
        return <div className="loading-redirect">Không có quyền truy cập...</div>;
    }
    
    return children;
};

export default ProtectedRoute;
