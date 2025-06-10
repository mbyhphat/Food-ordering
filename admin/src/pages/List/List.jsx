import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./List.css";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

function List() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/category");
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Không thể tải danh sách danh mục");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      confirm(
        "Xóa danh mục này sẽ xóa tất cả các món ăn thuộc danh mục này. Bạn có chắc chắn muốn xóa?"
      )
    ) {
      try {
        await axiosClient.delete(`/category/${id}`);
        toast.success("Xóa danh mục và các món ăn liên quan thành công");
        fetchCategories();
      } catch (error) {
        console.error("Delete error:", error);
        const response = error.response;
        if (response && response.data && response.data.message) {
          toast.error(response.data.message);
        } else {
          toast.error("Xóa danh mục thất bại");
        }
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/list_category/${id}`);
  };

  return (
    <div className="list add flex-col">
      <h2>Danh sách danh mục</h2>

      {loading ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : categories.length === 0 ? (
        <p>Không có danh mục nào</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Ảnh</b>
            <b>Tên danh mục</b>
            <b>Hành động</b>
          </div>

          {categories.map((category) => (
            <div key={category.category_id} className="list-table-format">
              <img
                src={category.image_url}
                className="category-image"
                alt={category.name}
                onClick={() => handleViewDetails(category.category_id)}
              />
              <div
                className="category-name"
                onClick={() => handleViewDetails(category.category_id)}
              >
                {category.name}
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => handleViewDetails(category.category_id)}
                  className="view-btn"
                >
                  Xem
                </button>
                <button
                  onClick={() => handleDelete(category.category_id)}
                  className="delete-btn"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
