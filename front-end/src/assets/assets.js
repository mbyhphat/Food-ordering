import bo_dau from "./bo_dau.jpg";
import bo_tieu_xanh from "./bo_tieu_xanh.jpg";
import ca_loc from "./ca_loc.jpg";
import ca_tai_tuong from "./ca_tai_tuong.jpg";
import cha_hoang_kim from "./cha_hoang_kim.jpg";
import chao_tom from "./chao_tom.jpg";
import chicken_1 from "./chicken_1.jpg";
import com_chien from "./com_chien.png";
import com_ga from "./com_ga.jpg";
import ga_bo_xoi_3_mau from "./ga_bo_xoi_3_mau.jpg";
import ga_hap_nuoc_mam from "./ga_hap_nuoc_mam.jpg";
import ga_ta_hap_cach_thuy from "./ga_ta_hap _cach_thuy.jpg";
import gio_heo_chien from "./gio_heo_chien.jpg";
import heo_quay from "./heo_quay.jpg";
import lau_ca_bop from "./lau_ca_bop.jpg";
import lau_ga from "./lau_ga.jpg";
import lau_hai_san from "./lau_hai_san.jpg";
import lau_suon_be from "./lau_suon_be.jpg";
import logo from "./Logo.png";
import sup_cua from "./sup_cua.jpg";
import sup_hai_san from "./sup_hai_san.jpg";
import tomg_rang_hongkong from "./tom_rang_hongkong.jpg";
import tom_su_trung_muoi from "./tom_su_trung_muoi.jpg";
import appetizer from "./appetizer.jpg";
import chicken from "./chicken.jpg";
import hot_pot from "./hot_pot.jpg";
import meat from "./meat.jpg";
import rice from "./rice.jpg";
import seafood from "./seafood.jpg";

export const assets = {
    bo_dau,
    bo_tieu_xanh,
    ca_loc,
    ca_tai_tuong,
    cha_hoang_kim,
    chao_tom,
    chicken_1,
    com_chien,
    com_ga,
    ga_bo_xoi_3_mau,
    ga_hap_nuoc_mam,
    ga_ta_hap_cach_thuy,
    gio_heo_chien,
    heo_quay,
    lau_ca_bop,
    lau_ga,
    lau_hai_san,
    lau_suon_be,
    logo,
    sup_cua,
    sup_hai_san,
    tomg_rang_hongkong,
    tom_su_trung_muoi,
    appetizer,
    chicken,
    hot_pot,
    meat,
    rice,
    seafood,
};

export const menu_list = [
    {
        menu_name: "Khai vị",
        menu_image: appetizer,
    },
    {
        menu_name: "Thịt gà",
        menu_image: chicken,
    },
    {
        menu_name: "Thịt bò-heo",
        menu_image: meat,
    },
    {
        menu_name: "Hải sản",
        menu_image: seafood,
    },
    {
        menu_name: "Cơm - canh",
        menu_image: rice,
    },
    {
        menu_name: "Lẩu",
        menu_image: hot_pot,
    },
];

export const food_list = [
    {
        _id: "1",
        name: "Chả hoàng kim",
        image: cha_hoang_kim,
        price: 100000,
        description: "Món ăn đặc biệt với lớp vỏ giòn rụm, nhân bên trong mềm thơm từ thịt xay nhuyễn, trứng muối bùi béo và gia vị đậm đà. Hoàn hảo cho bữa cơm gia đình hoặc tiệc chiêu đãi. Thưởng thức ngay hương vị vàng óng hấp dẫn!",
        category: "Khai vị"
    },
    {
        _id: "2",
        name: "Chạo tôm",
        image: chao_tom,
        price: 120000,
        description: "Chạo tôm thơm ngon với lớp vỏ giòn rụm, nhân tôm tươi xay nhuyễn hòa quyện cùng gia vị đặc biệt. Thích hợp làm món khai vị hấp dẫn cho mọi bữa tiệc.",
        category: "Khai vị"
    },
    {
        _id: "3",
        name: "Gà bó xôi 2 màu ôm trứng hạt sen",
        image: chicken_1,
        price: 450000,
        description: "Món gà bó xôi độc đáo với lớp xôi hai màu giòn rụm, bao bọc gà ta thơm mềm, kết hợp trứng muối và hạt sen bùi béo. Món ăn hoàn hảo cho những bữa tiệc sum vầy.",
        category: "Thịt gà"
    },
    {
        _id: "4",
        name: "Gà bó xôi 3 màu ôm trứng hạt sen",
        image: ga_bo_xoi_3_mau,
        price: 480000,
        description: "Phiên bản đặc biệt với ba màu xôi hấp dẫn, giòn rụm bên ngoài, gà bên trong mềm thơm, ôm trọn trứng muối và hạt sen bổ dưỡng. Món ngon không thể bỏ qua trong các bữa tiệc.",
        category: "Thịt gà"
    },
    {
        _id: "5",
        name: "Gà hấp nước mắm",
        image: ga_hap_nuoc_mam,
        price: 350000,
        description: "Gà ta hấp nước mắm đậm đà, giữ nguyên độ ngọt tự nhiên, thấm đều gia vị thơm ngon. Món ăn thích hợp cho bữa cơm gia đình hoặc đãi tiệc.",
        category: "Thịt gà"
    },
    {
        _id: "6",
        name: "Gà ta hấp cách thủy",
        image: ga_ta_hap_cach_thuy,
        price: 370000,
        description: "Gà ta hấp cách thủy giữ trọn vị ngọt tự nhiên, thịt mềm thơm và bổ dưỡng. Món ăn thanh đạm, phù hợp với người thích hương vị tinh tế.",
        category: "Thịt gà"
    },
    {
        _id: "7",
        name: "Bò nấu đậu",
        image: bo_dau,
        price: 250000,
        description: "Món bò nấu đậu thơm ngon với thịt bò hầm mềm, thấm đẫm nước sốt đậm đà, hòa quyện cùng đậu béo bùi. Thích hợp cho những bữa ăn ấm cúng.",
        category: "Thịt bò-heo"
    },
    {
        _id: "8",
        name: "Bò nấu tiêu xanh",
        image: bo_tieu_xanh,
        price: 270000,
        description: "Bò nấu tiêu xanh cay nhẹ, dậy mùi thơm đặc trưng từ tiêu xanh tươi, thịt bò hầm mềm, ngọt nước. Món ăn bổ dưỡng, lý tưởng cho mọi bữa tiệc.",
        category: "Thịt bò-heo"
    },
    {
        _id: "9",
        name: "Heo quay",
        image: heo_quay,
        price: 320000,
        description: "Heo quay da giòn rụm, thịt mềm ngọt, thấm đẫm gia vị đậm đà. Món ăn truyền thống hấp dẫn, thích hợp cho mọi dịp lễ, tết.",
        category: "Thịt bò-heo"
    },
    {
        _id: "10",
        name: "Giò heo chiên giòn",
        image: gio_heo_chien,
        price: 350000,
        description: "Giò heo chiên giòn với lớp da giòn tan, bên trong mềm béo, kết hợp nước chấm đậm đà tạo nên hương vị khó cưỡng. Thích hợp cho bữa tiệc hoặc bữa cơm gia đình.",
        category: "Thịt bò-heo"
    },
    {
        _id: "11",
        name: "Cá lóc quay me",
        image: ca_loc,
        price: 280000,
        description: "Cá lóc quay me với lớp da giòn rụm, thịt cá chắc ngọt, hòa quyện cùng nước sốt me chua ngọt hấp dẫn. Món ăn thơm ngon, thích hợp cho mọi bữa tiệc.",
        category: "Hải sản"
    },
    {
        _id: "12",
        name: "Cá tai tượng chiên xù",
        image: ca_tai_tuong,
        price: 320000,
        description: "Cá tai tượng chiên xù giòn rụm, vàng ươm, thịt cá trắng ngọt, ăn kèm rau sống và nước chấm chua ngọt đậm đà. Món ăn đặc sản không thể bỏ qua.",
        category: "Hải sản"
    },
    {
        _id: "13",
        name: "Tôm sú rang trứng muối",
        image: tom_su_trung_muoi,
        price: 350000,
        description: "Tôm sú rang trứng muối béo ngậy, thơm lừng với lớp sốt trứng muối bám đều từng con tôm, tạo nên hương vị mặn mà, hấp dẫn.",
        category: "Hải sản"
    },
    {
        _id: "14",
        name: "Tôm sú rang muối Hongkong",
        image: tomg_rang_hongkong,
        price: 360000,
        description: "Tôm sú rang muối kiểu Hongkong với vị cay nhẹ, lớp vỏ giòn thơm, thấm đều gia vị đặc trưng, tạo nên món ăn đậm đà, hấp dẫn.",
        category: "Hải sản"
    },
    {
        _id: "15",
        name: "Cơm chiên hải sản",
        image: com_chien,
        price: 150000,
        description: "Cơm chiên hải sản thơm ngon với hạt cơm tơi xốp, kết hợp tôm, mực và nghêu tươi, hòa quyện cùng gia vị đậm đà. Món ăn hấp dẫn cho mọi bữa ăn.",
        category: "Cơm - canh"
    },
    {
        _id: "16",
        name: "Cơm gà lá sen",
        image: com_ga,
        price: 180000,
        description: "Cơm gà lá sen hấp dẫn với hương thơm đặc trưng từ lá sen, gà ta xé sợi mềm ngọt, kết hợp nấm, hạt sen và gia vị tinh tế. Món ăn bổ dưỡng, đầy hương vị.",
        category: "Cơm - canh"
    },
    {
        _id: "17",
        name: "Súp hải sản",
        image: sup_hai_san,
        price: 130000,
        description: "Súp hải sản nóng hổi, bổ dưỡng với tôm, mực, nghêu tươi, hòa quyện cùng nước dùng thanh ngọt. Món khai vị lý tưởng, mang đến hương vị biển cả.",
        category: "Cơm - canh"
    },
    {
        _id: "18",
        name: "Súp cua hạt sen",
        image: sup_cua,
        price: 140000,
        description: "Súp cua hạt sen thơm ngon với thịt cua tươi, hạt sen bùi béo, kết hợp cùng nước dùng sánh mịn. Món ăn bổ dưỡng, thích hợp cho mọi lứa tuổi.",
        category: "Cơm - canh"
    },
    {
        _id: "19",
        name: "Lẩu cá bớp măng chua",
        image: lau_ca_bop,
        price: 350000,
        description: "Lẩu cá bớp măng chua với nước dùng chua ngọt thanh mát, cá bớp dai ngon, béo ngậy kết hợp với măng chua giòn sần sật. Món ăn lý tưởng cho những bữa ăn sum vầy.",
        category: "Lẩu"
    },
    {
        _id: "20",
        name: "Lẩu sườn bê nấu rượu hoa tiêu",
        image: lau_suon_be,
        price: 450000,
        description: "Lẩu sườn bê nấu rượu hoa tiêu độc đáo với nước dùng đậm đà, thoảng hương rượu nhẹ, sườn bê mềm ngọt, hòa quyện cùng vị cay tê của hoa tiêu. Món ăn đặc biệt, kích thích vị giác.",
        category: "Lẩu"
    },
    {
        _id: "21",
        name: "Lẩu nấm hải sản truyền thống",
        image: lau_hai_san,
        price: 400000,
        description: "Lẩu nấm hải sản thanh ngọt với nước dùng ninh từ nấm tự nhiên, kết hợp cùng tôm, mực, ngao tươi ngon. Món ăn bổ dưỡng, thanh đạm nhưng không kém phần hấp dẫn.",
        category: "Lẩu"
    },
    {
        _id: "22",
        name: "Lẩu gà tiềm ớt hiểm",
        image: lau_ga,
        price: 380000,
        description: "Lẩu gà tiềm ớt hiểm với gà ta hầm mềm, nước dùng thơm ngon, cay nhẹ từ ớt hiểm giúp kích thích vị giác. Món ăn bổ dưỡng, thích hợp cho những ngày se lạnh.",
        category: "Lẩu"
    }
];