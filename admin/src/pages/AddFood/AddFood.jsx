import React, { useEffect } from "react";
import "./AddFood.css";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axiosClient from "../../axios-client";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    quantity: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/category")
      .then((res) => setCategories(res.data.data))
      .catch(setCategories([]));
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Vui lòng chọn ảnh", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (!data.name.trim()) {
      toast.error("Vui lòng nhập tên sản phẩm", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (!data.description.trim()) {
      toast.error("Vui lòng nhập mô tả sản phẩm", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (!data.price.trim()) {
      toast.error("Vui lòng nhập giá sản phẩm", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (isNaN(data.price) || Number(data.price) <= 0) {
      toast.error("Giá sản phẩm phải là một số dương", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (!data.quantity.trim()) {
      toast.error("Vui lòng nhập số lượng", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }
    if (isNaN(data.quantity) || Number(data.quantity) <= 0) {
      toast.error("Số lượng phải là một số không âm", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category_id", data.category_id);
    formData.append("image_url", image);
    formData.append("quantity", Number(data.quantity));
    console.log("Form Data:", formData);
    console.log("Data:", data);
    try {
      await axiosClient.post("/food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Thêm sản phẩm thành công", {
        autoClose: 1000,
        position: "top-center",
      });
      setData({
        name: "",
        description: "",
        price: "",
        category_id: "",
        quantity: "",
      });
      setImage(null);
      document.getElementById("image").value = null; // Reset file input
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Thêm sản phẩm thất bại", {
        autoClose: 1000,
        position: "top-center",
      });
    }
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh lên </p>

          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              alt="Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên sản phẩm </p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            id=""
            placeholder="Nhập vào đây "
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả sản phẩm</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Viết nội dung ở đây "
            required
          ></textarea>
        </div>

        <div className="add-category flex-col">
          <p>Danh mục sản phẩm </p>
          <select
            onChange={onChangeHandler}
            name="category_id"
            value={data.category_id}
            required
          >
            <option value="" disabled>
              Chọn danh mục
            </option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="price-quantity">
          <div className="add-price flex-col">
            <p>Giá sản phẩm </p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="20000vnđ"
            />
          </div>
          <div className="add-quantity flex-col">
            <p>Số lượng </p>
            <input
              onChange={onChangeHandler}
              value={data.quantity}
              type="number"
              name="quantity"
              placeholder="Nhập số lượng"
              min="0"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Thêm
        </button>
      </form>
    </div>
  );
};

export default AddFood;
