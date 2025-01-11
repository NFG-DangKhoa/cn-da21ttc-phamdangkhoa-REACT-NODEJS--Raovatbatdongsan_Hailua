import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const BdsDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const location = useLocation(); // Lấy dữ liệu từ state
    const bds = location.state?.bds;

    const [seller, setSeller] = useState(null); // State để lưu thông tin seller
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
    const [isFavorited, setIsFavorited] = useState(false); // State để theo dõi trạng thái yêu thích
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra trạng thái đăng nhập

    // Hàm để lấy thông tin người bán
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/bds/seller/${id}`);
                setSeller(response.data); // Lưu thông tin seller vào state
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người bán:", error);
            } finally {
                setLoading(false); // Cập nhật trạng thái loading
            }
        };

        if (id) {
            fetchSeller(); // Gọi hàm lấy thông tin seller
        }

        // Kiểm tra người dùng đã đăng nhập chưa
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Nếu có token thì set isLoggedIn là true

        // Cuộn trang về đầu mỗi khi component được render
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const saveAndCheckFavorite = async () => {
            if (!isLoggedIn) return; // Nếu chưa đăng nhập thì không xử lý

            // Lưu tạm dữ liệu propertyId và userId, sau đó kiểm tra trạng thái yêu thích
            try {
                const token = localStorage.getItem("authToken");

                // Gửi request đến API kết hợp (save và check)
                const response = await axios.post(
                    "http://localhost:5000/api/favorites/save-temp",
                    { propertyId: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Xử lý kết quả trả về từ API
                if (response.data.success) {
                    if (response.data.isFavorited) {
                        setIsFavorited(true);  // Trái tim đã được yêu thích
                    } else {
                        setIsFavorited(false); // Trái tim chưa được yêu thích
                    }
                } else {
                    // Xử lý nếu có lỗi (tùy theo phản hồi của API)
                    console.error('Lỗi khi kiểm tra yêu thích:', response.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi xử lý yêu thích:", error);
            }
        };

        saveAndCheckFavorite();
    }, [id, isLoggedIn]);

    // Hàm xử lý khi nhấn vào trái tim
    const handleFavoriteClick = async () => {
        if (!isLoggedIn) {
            alert("Bạn nên đăng nhập để thêm vào danh sách yêu thích.");
            return; // Dừng lại nếu người dùng chưa đăng nhập
        }

        try {
            if (!isFavorited) {
                await axios.post(
                    "http://localhost:5000/api/favorites/add",
                    { propertyId: id },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    }
                );
                setIsFavorited(true); // Cập nhật trạng thái yêu thích
                alert("Đã thêm vào danh sách yêu thích!");
            } else {
                alert("Bất động sản đã có trong danh sách yêu thích!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    return bds ? (
        <div className="container mx-auto mt-56">
            <h1 className="text-3xl font-bold mb-6">{bds.title}</h1>
            <div className="flex">
                <img
                    src={bds.images[0]}
                    alt={bds.title}
                    className="w-1/2 h-auto rounded-lg shadow-lg"
                />
                <div className="ml-8 flex flex-col space-y-4 w-1/2">
                    <p className="text-lg">
                        <strong>Giá:</strong> {bds.price.toLocaleString()} VND
                    </p>
                    <p className="text-lg">
                        <strong>Diện tích:</strong> {bds.area} m²
                    </p>
                    <p className="text-lg">
                        <strong>Địa điểm:</strong> {bds.location}
                    </p>
                    <p className="text-lg">
                        <strong>Mô tả:</strong> {bds.description}
                    </p>

                    {/* Biểu tượng trái tim */}
                    <div>
                        <button onClick={handleFavoriteClick}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={isFavorited ? "red" : isLoggedIn ? "none" : "orange"} // Màu cam nếu chưa đăng nhập
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 000-7.78z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Thông tin người bán */}
                    {loading ? (
                        <p>Đang tải thông tin người bán...</p>
                    ) : seller ? (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">Thông tin người bán</h2>
                            <p><strong>Tên:</strong> {seller.name}</p>
                            <p><strong>Điện thoại:</strong> {seller.phone}</p>
                            <p><strong>Email:</strong> {seller.email}</p>
                            <p><strong>Địa chỉ:</strong> {seller.address}</p>
                        </div>
                    ) : (
                        <p>Không tìm thấy thông tin người bán.</p>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <p>Không tìm thấy thông tin bất động sản.</p>
    );
};

export default BdsDetail;
