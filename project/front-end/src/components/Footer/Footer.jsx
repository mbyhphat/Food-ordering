import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
export const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>Mama's Kitchen</h2>
          <p>
            Mama’s Kitchen là một thương hiệu ẩm thực gia đình nổi tiếng, chuyên phục vụ các món ăn truyền thống với hương vị đậm đà và nguyên liệu tươi ngon. Từ khi thành lập, Mama’s Kitchen đã trở thành lựa chọn quen thuộc của nhiều thực khách nhờ không gian ấm cúng và phong cách phục vụ tận tình. Thực đơn đa dạng của quán được xây dựng dựa trên công thức gia truyền, mang đến cho khách hàng trải nghiệm ẩm thực gần gũi như chính bữa cơm nhà, phù hợp cho những buổi sum họp gia đình hay gặp gỡ bạn bè.
          </p>
          <div className="footer-social-icon">
           <a href="https://www.facebook.com/" target="blank"> <i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.facebook.com/" target="blank"><i class="fa-brands fa-square-twitter"></i></a>
            <a href="https://www.instagram.com/" target="blank"><i class="fa-brands fa-square-instagram"></i></a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Công ty </h2>
          <ul>
            <li>Trang chủ </li>
            <li>Về nhà hàng </li>
            <li>Giao hàng </li>
            <li>Chính sách bảo mật </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Thông tin liên lạc  </h2>
          <ul>
            <li>0123456789</li>
            <li>contact@mamakitchen.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-coppyright">
        Coppyright 2025 @ Mama.com - All Right Reserved
      </p>
    </div>
  );
};
