import React, { useEffect, useState } from "react";
import "./List.css";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

function List() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await axiosClient.delete(`/category/${id}`);
        toast.success("Xóa danh mục thành công");
        fetchCategories();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Xóa danh mục thất bại");
      }
    }
  };

  return (
    <div className="list add flex-col">
      <h2>Danh sách danh mục</h2>

      {loading ? (
        <section class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
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
              />
              <div>{category.name}</div>
              <div className="action-buttons">
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
