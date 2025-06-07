import React, { useState, useEffect } from "react";
import "./Comment.css";

const Comment = () => {
    const [currentReview, setCurrentReview] = useState(0);

    const reviews = [
        {
            id: 1,
            name: "Nguyễn Thu Hà",
            avatar: "H",
            rating: 5,
            comment:
                "Thức ăn ở Mama's Kitchen rất ngon! Đặc biệt là món gà nướng mật ong, vị rất đậm đà và thơm phức. Nhân viên phục vụ rất chu đáo, sẽ quay lại lần sau.",
        },
        {
            id: 2,
            name: "Trần Minh Khoa",
            avatar: "K",
            rating: 5,
            comment:
                "Không gian ấm cúng như ở nhà, món ăn ngon miệng. Cơm tấm sườn nướng và bánh mì thịt nướng đều rất tuyệt. Giá cả hợp lý, phục vụ nhanh chóng.",
        },
        {
            id: 3,
            name: "Lê Thị Mai",
            avatar: "M",
            rating: 5,
            comment:
                "Đây là quán ăn yêu thích của gia đình tôi. Các món ăn đều tươi ngon, được chế biến tỉ mỉ. Đặc biệt thích món canh chua cá và gỏi cuốn tôm thịt.",
        },
        {
            id: 4,
            name: "Phạm Văn Nam",
            avatar: "N",
            rating: 4,
            comment:
                "Chất lượng món ăn ổn, phục vụ tận tình. Không gian quán rộng rãi, thoáng mát. Thích hợp cho cả gia đình và bạn bè đi ăn cùng.",
        },
        {
            id: 5,
            name: "Hoàng Thị Lan",
            avatar: "L",
            rating: 5,
            comment:
                "Mama's Kitchen là lựa chọn tuyệt vời cho những bữa ăn gia đình. Món ăn ngon, không gian ấm áp, giá cả phải chăng. Rất hài lòng với dịch vụ tại đây.",
        },
        {
            id: 6,
            name: "Võ Thanh Tùng",
            avatar: "T",
            rating: 5,
            comment:
                "Lần đầu đến nhưng ấn tượng rất tốt. Món nướng BBQ và lẩu thái chua cay đều ngon xuất sắc. Nhân viên nhiệt tình, thái độ phục vụ chuyên nghiệp.",
        },
        {
            id: 7,
            name: "Đặng Thị Hương",
            avatar: "H",
            rating: 4,
            comment:
                "Quán có không khí rất thoải mái, thức ăn ngon và tươi. Đặc biệt thích món bún bò Huế và chả cá Lã Vọng. Sẽ giới thiệu cho bạn bè biết.",
        },
        {
            id: 8,
            name: "Bùi Văn Đức",
            avatar: "D",
            rating: 5,
            comment:
                "Mama's Kitchen thực sự là một khám phá tuyệt vời! Món ăn đa dạng, từ Việt Nam đến châu Á. Phở bò và cơm gà Hải Nam ở đây rất authentic.",
        },
        {
            id: 9,
            name: "Ngô Thị Linh",
            avatar: "L",
            rating: 5,
            comment:
                "Đồ ăn tại đây luôn tươi ngon, được chế biến cẩn thận. Thái độ phục vụ rất tốt, giá cả hợp lý. Đây sẽ là địa điểm thường xuyên của gia đình tôi.",
        },
        {
            id: 10,
            name: "Lý Minh Quân",
            avatar: "Q",
            rating: 4,
            comment:
                "Không gian quán rộng rãi, sạch sẽ. Món ăn ngon, đặc biệt là các món nướng và lẩu. Dịch vụ giao hàng nhanh chóng, đóng gói cẩn thận.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) =>
                prev + 3 >= reviews.length ? 0 : prev + 3
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    const nextReview = () => {
        setCurrentReview((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
    };

    const prevReview = () => {
        setCurrentReview((prev) =>
            prev === 0 ? Math.max(0, reviews.length - 3) : Math.max(0, prev - 3)
        );
    };

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    return (
        <div className="comment" id="comment">
            <div className="comment-header">
                <h2 className="comment-title">Khách Hàng Nói Gì</h2>
                <p className="comment-subtitle">
                    Những đánh giá chân thực từ khách hàng của Mama's Kitchen
                </p>
            </div>

            <div className="review-container">
                <button onClick={prevReview} className="nav-button prev-button">
                    ‹
                </button>

                <div className="review-grid">
                    {reviews
                        .slice(currentReview, currentReview + 3)
                        .concat(
                            reviews.slice(
                                0,
                                Math.max(0, currentReview + 3 - reviews.length)
                            )
                        )
                        .map((review, index) => (
                            <div
                                key={`${review.id}-${index}`}
                                className="review-card"
                            >
                                <div className="customer-info">
                                    <div className="avatar">
                                        {review.avatar}
                                    </div>
                                    <div className="customer-details">
                                        <h3 className="customer-name">
                                            {review.name}
                                        </h3>
                                        <div className="stars">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p className="review-text">
                                    "{review.comment}"
                                </p>
                            </div>
                        ))}
                </div>

                <button onClick={nextReview} className="nav-button next-button">
                    ›
                </button>
            </div>

            <div className="indicators">
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map(
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentReview(index * 3)}
                            className={`indicator ${
                                Math.floor(currentReview / 3) === index
                                    ? "active"
                                    : ""
                            }`}
                        />
                    )
                )}
            </div>

            <div className="scroll-hint">
                <span className="scroll-text">
                    ← Vuốt để xem thêm đánh giá →
                </span>
            </div>
        </div>
    );
};

export default Comment;
