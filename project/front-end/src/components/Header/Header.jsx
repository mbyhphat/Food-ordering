import React from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const view_menu = useNavigate();
    return (
        <div className="header">
            <div className="header-two">
                <img src={assets.bg_header1} alt="logo" />
                <div className="inner-wrap">
                    <h2>Giới thiệu về Mama's Kitchen tại Việt Nam </h2>
                    <p>
                        Mama’s Kitchen, một thương hiệu ẩm thực đầy cảm hứng,
                        đang dần chinh phục thực khách Việt Nam với phong cách
                        nấu nướng đậm chất gia đình. Được thành lập bởi một nhóm
                        đầu bếp đam mê, Mama’s Kitchen khởi đầu từ một căn bếp
                        nhỏ, nơi những bữa ăn được chế biến với sự tận tâm và
                        yêu thương. Giờ đây, thương hiệu đã phát triển thành một
                        chuỗi nhà hàng được yêu thích, mang đến những món ăn
                        mang hương vị ấm áp, thân thuộc, nhưng không kém phần
                        sáng tạo.
                    </p>

                    <p>
                        Điều làm nên sự khác biệt của Mama’s Kitchen chính là sự
                        kết hợp hoàn hảo giữa công thức gia truyền và nguyên
                        liệu tươi ngon, đảm bảo mỗi món ăn đều mang hương vị
                        chân thật như bữa cơm nhà. Đặc biệt, Mama’s Kitchen mang
                        đến cho thực khách trải nghiệm ẩm thực thoải mái như ở
                        nhà , từ không gian ấm cúng, nhân viên thân thiện cho
                        đến những dịch vụ chu đáo như tặng trà thảo mộc miễn phí
                        hay góc giải trí cho trẻ em.
                    </p>
                </div>
            </div>
            <div className="header-one">
                <div className="header-contents">
                    <h2>Đặt món ăn yêu thích của bạn ở đây</h2>
                    <p>
                        Lựa chọn từ thực đơn đa dạng với nhiều món ăn hấp dẫn
                        được chế biến từ những nguyên liệu hảo hạng và chuyên
                        môn ẩm thực. Sứ mệnh của chúng tôi là thỏa mãn cơn thèm
                        ăn của bạn và nâng tầm trải nghiệm ăn uống của bạn, từng
                        bữa ăn ngon một{" "}
                    </p>
                    <button onClick={() => view_menu("/menu")}>
                        View menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
