import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./FoodDetail.css";

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    quantity: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/category")
      .then((res) => setCategories(res.data.data))
      .catch(setCategories([]));
  }, []);

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/food/${id}`);
      const foodData = response.data.data;
      setFood(foodData);
      setFormData({
        name: foodData.name,
        description: foodData.description || "",
        price: foodData.price || "",
        category_id: foodData.category_id || "",
        quantity: foodData.quantity || "",
        image: null,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching food:", error);
      toast.error("Không thể tải thông tin món ăn");
      setLoading(false);
      navigate("/list_food");
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
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append("quantity", formData.quantity);

      // Only append image if it exists
      if (formData.image) {
        formDataToSend.append("image_url", formData.image);
      }

      await axiosClient.post(`/food/${id}?_method=PUT`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cập nhật món ăn thành công");
      navigate("/list_food");
    } catch (error) {
      console.error("Error updating food:", error);
      const response = error.response;
      if (response && response.status === 422) {
        // Handle validation errors
        if (response.data.errors) {
          Object.keys(response.data.errors).forEach((field) => {
            toast.error(response.data.errors[field][0]);
          });
        } else if (response.data.message) {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Cập nhật món ăn thất bại");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="category-detail">
        <h2>Chi tiết món ăn</h2>
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
    <div className="food-detail">
      <div className="header">
        <h2>Chi tiết món ăn</h2>
        <button className="back-btn" onClick={() => navigate("/list_food")}>
          Quay lại
        </button>
      </div>

      <div className="detail-container">
        <div className="current-info">
          <div className="image-container">
            <img
              src={food.image_url}
              alt={food.name}
              className="detail-image"
            />
          </div>
          <div className="info">
            <h3>{food.name}</h3>
            <p>ID: {food.item_id}</p>
          </div>
        </div>

        <div className="edit-form">
          <h3>Cập nhật thông tin</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group name">
              <label htmlFor="name">Tên món ăn</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group description">
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group price">
              <label htmlFor="price">Giá</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group category">
              <label htmlFor="category_id">Loại món ăn</label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
              >
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group quantity">
              <label htmlFor="quantity">Số lượng</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Hình ảnh món ăn</label>
              <input
                type="file"
                id="image_url"
                name="image_url"
                onChange={handleInputChange}
                accept="image/*"
              />
              <p className="help-text">Để trống nếu không muốn thay đổi ảnh</p>
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "Đang lưu..." : "Cập nhật"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
