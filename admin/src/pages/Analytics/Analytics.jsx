import React, { useState, useEffect } from "react";
import "./Analytics.css";

function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalFoodItems: 0,
    revenueByMonth: [],
    topFoodItems: [],
    topCategories: [],
    previousMonth: {
      totalOrders: 0,
      totalRevenue: 0,
      totalFoodItems: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const API_BASE = "http://localhost:8000/api";

  useEffect(() => {
    fetchAnalytics();
  }, [selectedMonth, selectedYear]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Lấy dữ liệu tháng hiện tại
      const res = await fetch(
        `${API_BASE}/analytics?month=${selectedMonth}&year=${selectedYear}`
      );

      // Tính tháng trước
      const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
      const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;

      // Lấy dữ liệu tháng trước
      const prevRes = await fetch(
        `${API_BASE}/analytics?month=${prevMonth}&year=${prevYear}`
      );

      if (!res.ok) {
        throw new Error("Lỗi khi gọi API thống kê");
      }

      const data = await res.json();
      const prevData = prevRes.ok ? await prevRes.json() : null;

      setAnalytics({
        ...data,
        previousMonth: prevData
          ? {
              totalOrders: prevData.totalOrders,
              totalRevenue: prevData.totalRevenue,
              totalFoodItems: prevData.totalFoodItems,
            }
          : null,
      });
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  };

  const calculatePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  const formatPercentageChange = (current, previous) => {
    const change = calculatePercentageChange(current, previous);
    if (change === null) return "Không có dữ liệu so sánh";

    const isPositive = change >= 0;
    const className = isPositive ? "positive" : "negative";
    const sign = isPositive ? "+" : "";

    return (
      <div className={`card-change ${className}`}>
        {sign}
        {change.toFixed(1)}% so với tháng trước
      </div>
    );
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner">Đang tải dữ liệu thống kê...</div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Thống kê và Phân tích</h1>
        <div className="analytics-period">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overview-cards">
        <div className="overview-card">
          <div className="card-icon orders">📊</div>
          <div className="card-content">
            <h3>Tổng đơn hàng</h3>
            <div className="card-number">
              {formatNumber(analytics.totalOrders)}
            </div>
            {formatPercentageChange(
              analytics.totalOrders,
              analytics.previousMonth?.totalOrders
            )}
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon revenue">💰</div>
          <div className="card-content">
            <h3>Doanh thu</h3>
            <div className="card-number">
              {formatCurrency(analytics.totalRevenue)}
            </div>
            {formatPercentageChange(
              analytics.totalRevenue,
              analytics.previousMonth?.totalRevenue
            )}
          </div>
        </div>

        <div className="overview-card">
          <div className="card-icon food">🍽️</div>
          <div className="card-content">
            <h3>Món ăn</h3>
            <div className="card-number">
              {formatNumber(analytics.totalFoodItems)}
            </div>
            {formatPercentageChange(
              analytics.totalFoodItems,
              analytics.previousMonth?.totalFoodItems
            )}
          </div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-container full-width">
          <h3>Doanh thu các tháng trong năm {selectedYear}</h3>
          <div className="selected-period">
            <span>
              Tháng được chọn:{" "}
              <strong>
                Tháng {selectedMonth}/{selectedYear}
              </strong>
            </span>
          </div>
          <div className="revenue-chart">
            {analytics.revenueByMonth.map((item, index) => (
              <div
                key={index}
                className={`chart-bar ${item.isSelected ? "selected" : ""}`}
              >
                <div
                  className="bar"
                  style={{
                    height: `${
                      (item.revenue /
                        Math.max(
                          ...analytics.revenueByMonth.map((i) => i.revenue)
                        )) *
                      100
                    }%`,
                  }}
                ></div>
                <div className="bar-label">{item.month}</div>
                <div className="bar-value">{formatCurrency(item.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-tables">
        <div className="table-container">
          <h3>
            Món ăn bán chạy tháng {selectedMonth}/{selectedYear}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Tên món</th>
                <th>Đã bán</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topFoodItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="food-name">
                      <span className="rank">#{index + 1}</span>
                      {item.name}
                    </div>
                  </td>
                  <td>{formatNumber(item.sold)}</td>
                  <td>{formatCurrency(item.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <h3>
            Danh mục phổ biến tháng {selectedMonth}/{selectedYear}
          </h3>
          <table>
            <thead>
              <tr>
                <th>Danh mục</th>
                <th>Số đơn</th>
                <th>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topCategories.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="category-name">
                      <span className="rank">#{index + 1}</span>
                      {item.name}
                    </div>
                  </td>
                  <td>{formatNumber(item.orders)}</td>
                  <td>
                    <div className="percentage-bar">
                      <div
                        className="percentage-fill"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                      <span>{item.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
