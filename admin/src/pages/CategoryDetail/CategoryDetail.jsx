import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import "./CategoryDetail.css";

function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/category/${id}`);
      const categoryData = response.data.data;
      setCategory(categoryData);
      setFormData({
        name: categoryData.name,
        image: null,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category:", error);
      toast.error("Không thể tải thông tin danh mục");
      setLoading(false);
      navigate("/list_category");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_url" && files.length > 0) {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);

      if (formData.image) {
        formDataToSend.append("image_url", formData.image);
      }

      await axiosClient.post(`/category/${id}?_method=PUT`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cập nhật danh mục thành công");
      fetchCategory();
    } catch (error) {
      console.error("Update error:", error);
      const response = error.response;
      if (response && response.status === 422) {
        // Handle validation errors
        if (response.data.errors) {
          // If errors is an object with field names as keys
          Object.keys(response.data.errors).forEach((field) => {
            toast.error(response.data.errors[field][0], {
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
        }
      } else {
        toast.error("Cập nhật danh mục thất bại");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="category-detail">
        <h2>Chi tiết danh mục</h2>
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    );
  }

  return (
    <div className="category-detail">
      <div className="header">
        <h2>Chi tiết danh mục</h2>
        <button className="back-btn" onClick={() => navigate("/list_category")}>
          Quay lại danh sách
        </button>
      </div>

      <div className="detail-container">
        <div className="current-info">
          <div className="image-container">
            <img
              src={category.image_url}
              alt={category.name}
              className="detail-image"
            />
          </div>
          <div className="info">
            <h3>{category.name}</h3>
            <p>ID: {category.category_id}</p>
          </div>
        </div>

        <div className="edit-form">
          <h3>Cập nhật thông tin</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Tên danh mục</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Hình ảnh danh mục</label>
              <input
                type="file"
                id="image_url"
                name="image_url"
                onChange={handleInputChange}
                accept="image/*"
              />
              <p className="help-text">Để trống nếu không muốn thay đổi ảnh</p>
            </div>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryDetail;
