import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axiosClient from "../../axios-client";

function Add() {
  const [data, setData] = useState({
    id: null,
    name: "",
    image_url: null,
  });

  const handleNameChange = (event) => {
    setData((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setData((prev) => ({
      ...prev,
      image_url: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.image_url) {
      toast.error("Vui lòng chọn ảnh", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    if (!data.name.trim()) {
      toast.error("Vui lòng nhập tên danh mục", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    // Gửi dữ liệu bằng form-data nếu có file ảnh
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image_url", data.image_url);

    // Gửi API nếu cần
    try {
      await axiosClient.post("/category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Thêm danh mục thành công", {
        autoClose: 1000,
        position: "top-center",
      });

      // Reset form
      setData({
        id: null,
        name: "",
        image_url: null,
      });
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response data:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error headers:", err.response?.headers);

      const response = err.response;
      if (response && response.status === 422) {
        // Handle validation errors
        if (response.data.errors) {
          // If errors is an object with field names as keys
          Object.keys(response.data.errors).forEach((field) => {
            toast.error(`${field}: ${response.data.errors[field].join(", ")}`, {
              autoClose: 3000,
              position: "top-center",
            });
          });
        } else if (response.data.message) {
          // If there's a general message
          toast.error(response.data.message, {
            autoClose: 3000,
            position: "top-center",
          });
        } else {
          toast.error("Lỗi xác thực dữ liệu", {
            autoClose: 3000,
            position: "top-center",
          });
        }
      } else {
        toast.error(`Có lỗi xảy ra: ${err.message}`, {
          autoClose: 3000,
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh lên</p>
          <label htmlFor="image">
            <img
              src={
                data.image_url
                  ? URL.createObjectURL(data.image_url)
                  : assets.upload
              }
              alt="Preview"
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên danh mục</p>
          <input
            onChange={handleNameChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Nhập vào đây"
          />
        </div>
        <button type="submit" className="add-btn">
          Thêm
        </button>
      </form>
    </div>
  );
}

export default Add;
