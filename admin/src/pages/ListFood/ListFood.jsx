import React, { useEffect, useState } from "react";
import "./ListFood.css";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListFood = () => {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/food");
      setFoods(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Không thể tải danh sách món ăn");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa món ăn này?")) {
      try {
        await axiosClient.delete(`/food/${id}`);
        toast.success("Xóa món ăn thành công");
        fetchFoods();
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Xóa món ăn thất bại");
      }
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/list_food/${id}`);
  };

  return (
    <div className="list-food flex-col">
      <h2>Danh sách món ăn</h2>
      {loading ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : foods.length === 0 ? (
        <p>Không có món ăn nào</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Ảnh</b>
            <b>Tên món ăn</b>
            <b>Loại</b>
            <b>Mô tả</b>
            <b>Giá</b>
            <b>Số lượng</b>
            <b style={{ textAlign: "right" }}>Hành động</b>
          </div>
          {foods.map((food) => (
            <div className="list-table-format" key={food.item_id}>
              <img
                src={food.image_url}
                alt={food.name}
                onClick={() => handleViewDetails(food.item_id)}
                className="food-image"
              />
              <div
                className="food-name"
                onClick={() => handleViewDetails(food.item_id)}
              >
                {food.name}
              </div>
              <div
                className="food-category"
                onClick={() => handleViewDetails(food.item_id)}
              >
                {food.category_name}
              </div>
              <div
                className="food-description"
                onClick={() => handleViewDetails(food.item_id)}
              >
                {food.description}
              </div>
              <div
                className="food-price"
                onClick={() => handleViewDetails(food.item_id)}
              >
                {food.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div
                className="food-quantity"
                onClick={() => handleViewDetails(food.item_id)}
              >
                {food.quantity}
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => handleViewDetails(food.item_id)}
                  className="view-btn"
                >
                  Xem
                </button>
                <button
                  onClick={() => handleDelete(food.item_id)}
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
};

export default ListFood;
