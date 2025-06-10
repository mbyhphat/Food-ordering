CREATE DATABASE FoodOrdering CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE FoodOrdering;

CREATE TABLE Account (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   email VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   phone VARCHAR(15) NULL,
   address LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
   password VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   role TINYINT NOT NULL, -- 0: Khách hàng, 1: Admin
   image_url LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

CREATE TABLE Restaurant_Info (
    info_id INT PRIMARY KEY,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    description VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    logo_url LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci 
);

CREATE TABLE Category (
   category_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
   image_url LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci 
);

CREATE TABLE Food_Items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    description LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    price BIGINT NOT NULL,
    image_url VARCHAR(255),
    quantity INT NOT NULL DEFAULT 0
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATE NOT NULL,
    delivery_address LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    contact_phone VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    total_money INT NOT NULL,
);

CREATE TABLE Orders_Details (
	food_id INT NOT NULL,
	order_id INT NOT NULL,
	quantity INT NOT NULL DEFAULT 1,
	price BIGINT NOT NULL,
	PRIMARY KEY (food_id, order_id)
);

CREATE TABLE Carts (
	cart_id INT AUTO_INCREMENT PRIMARY KEY,
	customer_id INT NOT NULL,
    total_money DECIMAL(10, 2) DEFAULT 0,
    UNIQUE KEY unique_customer (customer_id)
);

CREATE TABLE Carts_Details (
    cart_id INT NOT NULL,
    customer_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (cart_id, customer_id, food_id)
);

CREATE TABLE Promotions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(100) NOT NULL,
    description LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    discount_percentage FLOAT NOT NULL DEFAULT 0,
    min_order_value FLOAT DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE Food_Promotions (
   food_id INT NOT NULL,
   promotion_id INT NOT NULL,
   PRIMARY KEY (promotion_id, food_id)
);

CREATE TABLE Category_Promotions (
   category_id INT NOT NULL,
   promotion_id INT NOT NULL,
   PRIMARY KEY (promotion_id, category_id)
);

ALTER TABLE Food_Items ADD CONSTRAINT FK_FOOD_CATEGORY FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE RESTRICT;

ALTER TABLE Orders ADD CONSTRAINT FK_ORDER_CUSTOMER FOREIGN KEY (user_id) REFERENCES Account(id) ON DELETE RESTRICT;

ALTER TABLE Carts ADD CONSTRAINT FK_CART_CUSTOMER FOREIGN KEY (customer_id) REFERENCES Account(id) ON DELETE RESTRICT;

ALTER TABLE Carts_Details ADD CONSTRAINT FK_CARTDETAILS_FOOD FOREIGN KEY (food_id) REFERENCES Food_Items(item_id) ON DELETE RESTRICT;
ALTER TABLE Carts_Details ADD CONSTRAINT FK_CARTDETAILS_CART FOREIGN KEY (cart_id) REFERENCES Carts(cart_id) ON DELETE RESTRICT;

ALTER TABLE Orders_Details ADD CONSTRAINT FK_ORDERDETAILS_FOOD FOREIGN KEY (food_id) REFERENCES Food_Items(item_id) ON DELETE RESTRICT;
ALTER TABLE Orders_Details ADD CONSTRAINT FK_ORDERDETAILS_ORDER FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE RESTRICT;

ALTER TABLE Food_Promotions ADD CONSTRAINT FK_FOODPROMOTIONS_PROMOTION FOREIGN KEY (promotion_id) REFERENCES Promotions(id) ON DELETE RESTRICT;
ALTER TABLE Food_Promotions ADD CONSTRAINT FK_FOODPROMOTIONS_FOOD FOREIGN KEY (food_id) REFERENCES Food_Items(item_id) ON DELETE RESTRICT;

ALTER TABLE Category_Promotions ADD CONSTRAINT FK_CATEGORYPROMOTIONS_PROMOTION FOREIGN KEY (promotion_id) REFERENCES Promotions(id) ON DELETE RESTRICT;
ALTER TABLE Category_Promotions ADD CONSTRAINT FK_CATEGORYPROMOTIONS_CATEGORY FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE RESTRICT;

INSERT INTO Account (name,email,phone,address,password,role) VALUES 
('Phát', 'admin@gmail.com', '0123456789', 'HCM', '$2y$12$LKOd5DvPOG7BLe123V0VTu7sXf7fZXAWocMo/2n7NVf8kGUlnzqmW',1),
('Thắng', 'user1@gmail.com', '0123123123', 'HCM', '$2y$12$LKOd5DvPOG7BLe123V0VTu7sXf7fZXAWocMo/2n7NVf8kGUlnzqmW',0);

INSERT INTO Restaurant_Info (name, address, phone_number, description, logo_url) 
VALUES ('Mama''s Food', 'Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh', '0325752722', 'Mama''s Food - Chuẩn cơm mẹ nấu', 'Logo.png');

INSERT INTO Category (name, image_url) VALUES 
('Khai vị', 'appetizer.jpg'),
('Thịt gà', 'chicken.jpg'),
('Thịt bò-heo', 'meat.jpg'),
('Hải sản', 'seafood.jpg'),
('Cơm-canh', 'rice.jpg'),
('Lẩu', 'hot_pot.jpg');

INSERT INTO Food_Items (category_id, name, description, price, image_url, quantity) VALUES 
(1, 'Chả hoàng kim', 'Món ăn đặc biệt với lớp vỏ giòn rụm, nhân bên trong mềm thơm từ thịt xay nhuyễn, trứng muối bùi béo và gia vị đậm đà. Hoàn hảo cho bữa cơm gia đình hoặc tiệc chiêu đãi. Thưởng thức ngay hương vị vàng óng hấp dẫn!', 100000, 'cha_hoang_kim.jpg',10),
(1, 'Chạo tôm', 'Chạo tôm thơm ngon với lớp vỏ giòn rụm, nhân tôm tươi xay nhuyễn hòa quyện cùng gia vị đặc biệt. Thích hợp làm món khai vị hấp dẫn cho mọi bữa tiệc.', 120000, 'chao_tom.jpg', 7),

(2, 'Gà bó xôi 2 màu ôm trứng hạt sen', 'Món gà bó xôi độc đáo với lớp xôi hai màu giòn rụm, bao bọc gà ta thơm mềm, kết hợp trứng muối và hạt sen bùi béo. Món ăn hoàn hảo cho những bữa tiệc sum vầy.', 450000, 'chicken_1.jpg', 5),
(2, 'Gà bó xôi 3 màu ôm trứng hạt sen', 'Phiên bản đặc biệt với ba màu xôi hấp dẫn, giòn rụm bên ngoài, gà bên trong mềm thơm, ôm trọn trứng muối và hạt sen bổ dưỡng. Món ngon không thể bỏ qua trong các bữa tiệc.', 480000, 'ga_bo_xoi_3_mau.jpg', 6),
(2, 'Gà hấp nước mắm', 'Gà ta hấp nước mắm đậm đà, giữ nguyên độ ngọt tự nhiên, thấm đều gia vị thơm ngon. Món ăn thích hợp cho bữa cơm gia đình hoặc đãi tiệc.', 350000, 'ga_hap_nuoc_mam.jpg', 3),
(2, 'Gà ta hấp cách thủy', 'Gà ta hấp cách thủy giữ trọn vị ngọt tự nhiên, thịt mềm thơm và bổ dưỡng. Món ăn thanh đạm, phù hợp với người thích hương vị tinh tế.', 370000, 'ga_ta_hap _cach_thuy.jpg', 4),

(3, 'Bò nấu đậu', 'Món bò nấu đậu thơm ngon với thịt bò hầm mềm, thấm đẫm nước sốt đậm đà, hòa quyện cùng đậu béo bùi. Thích hợp cho những bữa ăn ấm cúng', 250000, 'bo_dau.jpg', 12),
(3, 'Bò nấu tiêu xanh', 'Bò nấu tiêu xanh cay nhẹ, dậy mùi thơm đặc trưng từ tiêu xanh tươi, thịt bò hầm mềm, ngọt nước. Món ăn bổ dưỡng, lý tưởng cho mọi bữa tiệc.', 270000, 'bo_tieu_xanh.jpg', 9),
(3, 'Heo quay', 'Heo quay da giòn rụm, thịt mềm ngọt, thấm đẫm gia vị đậm đà. Món ăn truyền thống hấp dẫn, thích hợp cho mọi dịp lễ, tết.', 320000, 'heo_quay.jpg', 8),
(3, 'Giò heo chiên giòn', 'Giò heo chiên giòn với lớp da giòn tan, bên trong mềm béo, kết hợp nước chấm đậm đà tạo nên hương vị khó cưỡng. Thích hợp cho bữa tiệc hoặc bữa cơm gia đình.', 350000, 'gio_heo_chien.jpg', 4),

(4, 'Cá lóc quay me', 'Cá lóc quay me với lớp da giòn rụm, thịt cá chắc ngọt, hòa quyện cùng nước sốt me chua ngọt hấp dẫn. Món ăn thơm ngon, thích hợp cho mọi bữa tiệc.', 280000, 'ca_loc.jpg', 2),
(4, 'Cá tai tượng chiên xù', 'Cá tai tượng chiên xù giòn rụm, vàng ươm, thịt cá trắng ngọt, ăn kèm rau sống và nước chấm chua ngọt đậm đà. Món ăn đặc sản không thể bỏ qua.', 320000, 'ca_tai_tuong.jpg', 3),
(4, 'Tôm sú rang trứng muối', 'Tôm sú rang trứng muối béo ngậy, thơm lừng với lớp sốt trứng muối bám đều từng con tôm, tạo nên hương vị mặn mà, hấp dẫn.', 350000, 'tom_su_trung_muoi.jpg', 15),
(4, 'Tôm sú rang muối Hongkong', 'Tôm sú rang muối kiểu Hongkong với vị cay nhẹ, lớp vỏ giòn thơm, thấm đều gia vị đặc trưng, tạo nên món ăn đậm đà, hấp dẫn.', 360000, 'tom_rang_hongkong.jpg', 20),

(5, 'Cơm chiên hải sản', 'Cơm chiên hải sản thơm ngon với hạt cơm tơi xốp, kết hợp tôm, mực và nghêu tươi, hòa quyện cùng gia vị đậm đà. Món ăn hấp dẫn cho mọi bữa ăn.', 150000, 'com_chien.png', 25),
(5, 'Cơm gà lá sen', 'Cơm gà lá sen hấp dẫn với hương thơm đặc trưng từ lá sen, gà ta xé sợi mềm ngọt, kết hợp nấm, hạt sen và gia vị tinh tế. Món ăn bổ dưỡng, đầy hương vị.', 180000, 'com_ga.jpg', 14),
(5, 'Súp hải sản', 'Súp hải sản nóng hổi, bổ dưỡng với tôm, mực, nghêu tươi, hòa quyện cùng nước dùng thanh ngọt. Món khai vị lý tưởng, mang đến hương vị biển cả.', 130000, 'sup_hai_san.jpg', 50),
(5, 'Súp cua hạt sen', 'Súp cua hạt sen thơm ngon với thịt cua tươi, hạt sen bùi béo, kết hợp cùng nước dùng sánh mịn. Món ăn bổ dưỡng, thích hợp cho mọi lứa tuổi.', 140000, 'sup_cua.jpg', 35),

(6, 'Lẩu cá bớp măng chua', 'Lẩu cá bớp măng chua với nước dùng chua ngọt thanh mát, cá bớp dai ngon, béo ngậy kết hợp với măng chua giòn sần sật. Món ăn lý tưởng cho những bữa ăn sum vầy.', 350000, 'lau_ca_bop.jpg', 7),
(6, 'Lẩu sườn bê nấu rượu hoa tiêu', 'Lẩu sườn bê nấu rượu hoa tiêu độc đáo với nước dùng đậm đà, thoảng hương rượu nhẹ, sườn bê mềm ngọt, hòa quyện cùng vị cay tê của hoa tiêu. Món ăn đặc biệt, kích thích vị giác.', 450000, 'lau_suon_be.jpg', 4),
(6, 'Lẩu nấm hải sản truyền thống', 'Lẩu nấm hải sản thanh ngọt với nước dùng ninh từ nấm tự nhiên, kết hợp cùng tôm, mực, ngao tươi ngon. Món ăn bổ dưỡng, thanh đạm nhưng không kém phần hấp dẫn.', 400000, 'lau_hai_san.jpg', 8),
(6, 'Lẩu gà tiềm ớt hiểm', 'Lẩu gà tiềm ớt hiểm với gà ta hầm mềm, nước dùng thơm ngon, cay nhẹ từ ớt hiểm giúp kích thích vị giác. Món ăn bổ dưỡng, thích hợp cho những ngày se lạnh.', 380000, 'lau_ga.jpg', 3);

