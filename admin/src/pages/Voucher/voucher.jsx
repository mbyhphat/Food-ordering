import React, { useState, useEffect } from "react";
import "./voucher.css";
import axiosClient from "../../axios-client";

function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discount_percentage: 0,
    min_order_value: 0,
    start_date: "",
    end_date: "",
  });

  const API_ENDPOINT = "promotions";

  // Lấy danh sách voucher từ database
  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(API_ENDPOINT);
      setVouchers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách voucher:", error);
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingVoucher) {
        // Cập nhật voucher
        const response = await axiosClient.put(
          `${API_ENDPOINT}/${editingVoucher.id}`,
          formData
        );
        const updatedVoucher = response.data;
        setVouchers((prev) =>
          prev.map((voucher) =>
            voucher.id === editingVoucher.id ? updatedVoucher : voucher
          )
        );
        alert("Cập nhật voucher thành công!");
      } else {
        // Thêm voucher mới
        const response = await axiosClient.post(API_ENDPOINT, formData);
        const newVoucher = response.data;
        setVouchers((prev) => [...prev, newVoucher]);
        alert("Thêm voucher thành công!");
      }

      resetForm();
    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.response?.data?.message || "Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      description: voucher.description,
      discount_percentage: voucher.discount_percentage,
      min_order_value: voucher.min_order_value,
      start_date: voucher.start_date,
      end_date: voucher.end_date,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        setLoading(true);
        await axiosClient.delete(`${API_ENDPOINT}/${id}`);
        setVouchers((prev) => prev.filter((voucher) => voucher.id !== id));
        alert("Xóa voucher thành công!");
      } catch (error) {
        console.error("Lỗi:", error);
        alert(error.response?.data?.message || "Lỗi kết nối server");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      discount_percentage: 0,
      min_order_value: 0,
      start_date: "",
      end_date: "",
    });
    setEditingVoucher(null);
    setIsFormOpen(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="voucher-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Đang xử lý...</div>
        </div>
      )}

      <div className="voucher-header">
        <h1>Quản lý Voucher</h1>
        <button
          className="btn-add"
          onClick={() => setIsFormOpen(true)}
          disabled={loading}
        >
          Thêm Voucher
        </button>
      </div>

      {/* Form thêm/sửa voucher */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingVoucher ? "Sửa Voucher" : "Thêm Voucher"}</h3>
              <button className="btn-close" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="voucher-form">
              <div className="form-group">
                <label>Mã voucher:</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Mô tả:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Phần trăm giảm giá (%):</label>
                <input
                  type="number"
                  name="discount_percentage"
                  value={formData.discount_percentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Giá trị đơn hàng tối thiểu (VND):</label>
                <input
                  type="number"
                  name="min_order_value"
                  value={formData.min_order_value}
                  onChange={handleInputChange}
                  min="0"
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu:</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Ngày kết thúc:</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-cancel"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading
                    ? "Đang xử lý..."
                    : editingVoucher
                    ? "Cập nhật"
                    : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Danh sách voucher */}
      <div className="voucher-list">
        <table>
          <thead>
            <tr>
              <th>Mã voucher</th>
              <th>Mô tả</th>
              <th>Giảm giá (%)</th>
              <th>Đơn tối thiểu</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>
                  <span className="voucher-code">{voucher.code}</span>
                </td>
                <td className="description">{voucher.description}</td>
                <td>{voucher.discount_percentage}%</td>
                <td>{formatCurrency(voucher.min_order_value)}</td>
                <td>
                  {new Date(voucher.start_date).toLocaleDateString("vi-VN")}
                </td>
                <td>
                  {new Date(voucher.end_date).toLocaleDateString("vi-VN")}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(voucher)}
                    className="btn-edit"
                    disabled={loading}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(voucher.id)}
                    className="btn-delete"
                    disabled={loading}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {vouchers.length === 0 && !loading && (
          <div className="empty-state">
            <p>Chưa có voucher nào</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Voucher;
