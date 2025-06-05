import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import "./ProtectedRoute.css";

export const AdminProtectedRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!token) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }      try {
        // Use the status endpoint to check user permissions
        const response = await axiosClient.get("/user-status");
        const { authenticated, isAdmin, onCorrectPortal, redirectUrl } = response.data;
        
        if (authenticated && isAdmin && onCorrectPortal) {
          setIsAdmin(true);
        } else if (redirectUrl) {
          toast.info("Đang chuyển hướng...", {
            position: "top-center",
            autoClose: 2000,
          });
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 2000);
          setIsAdmin(false);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAdmin(false);
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [token]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="loading-authentication">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }
  // Check if user is admin and if they're on the correct host
  if (!isAdmin) {
    // If not logged in at all, redirect to user login page
    if (!token) {
      toast.warn("Vui lòng đăng nhập để truy cập trang quản trị.", {
        position: "top-center",
        autoClose: 3000,
      });
      
      // Check user status with the backend before redirecting
      axiosClient.get('/user-status')
        .catch(() => {
          window.location.href = "http://localhost:3000/login";
        });
      return null;
    }// If logged in but not admin, show unauthorized message
    toast.error("Bạn không có quyền truy cập trang quản trị.", {
      position: "top-center",
      autoClose: 3000,
    });

    return (
      <div className="redirecting">
        Không có quyền truy cập. Vui lòng đăng nhập với tài khoản admin.
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;
