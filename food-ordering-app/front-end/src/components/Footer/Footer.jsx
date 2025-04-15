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
            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc
            trình bày và dàn trang phục vụ cho ngành công nghiệp in ấn. Lorem
            Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in
            ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản
            với nhau để tạo thành một bản mẫu văn bản
          </p>
          <div className="footer-social-icon">
           <a href="https://www.facebook.com/" target="blank"> <i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.facebook.com/" target="blank"><i class="fa-brands fa-square-twitter"></i></a>
            <a href="https://www.instagram.com/" target="blank"><i class="fa-brands fa-square-instagram"></i></a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
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
