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
      }

      try {
        // Check if the logged-in user is an admin (role is not 0)
        const response = await axiosClient.get("/user");
        setIsAdmin(response.data?.role !== 0);
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
    // Show an unauthorized access message
    toast.error("Bạn không có quyền truy cập trang quản trị.", {
      position: "top-center",
      autoClose: 3000,
    });

    // Add a slight delay before redirecting
    setTimeout(() => {
      window.location.href = "http://localhost:3000";
    }, 2000);

    return (
      <div className="redirecting">
        Đang chuyển hướng đến trang người dùng...
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;
