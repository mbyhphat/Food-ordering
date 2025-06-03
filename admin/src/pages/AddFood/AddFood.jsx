import React from "react";
import "./AddFood.css";
import { useState } from "react";
import { assets } from "../../assets/assets";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Khai vị ",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onChangeHandler}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh lên </p>

          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
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
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Danh mục sản phẩm </p>
            <select onChange={onChangeHandler} name="category">
              <option value="Khai vị">Khai vị</option>
              <option value="Thịt gà ">Thịt gà </option>
              <option value="Thịt bò-heo ">Thịt bò-heo </option>
              <option value="Hải sản ">Hải sản </option>
              <option value="Cơm-canh ">Cơm-canh </option>
              <option value="Lẩu ">Lẩu </option>
            </select>
          </div>
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
        </div>
        <button type="submit" className="add-btn">
          Thêm
        </button>
      </form>
    </div>
  );
};

export default AddFood;
