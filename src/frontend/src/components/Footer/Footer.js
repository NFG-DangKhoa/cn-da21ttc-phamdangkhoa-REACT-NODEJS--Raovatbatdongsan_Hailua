import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-6 border-t-1 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] mt-40">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
                {/* Phần thông tin về BDS123.VN */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Về BDSHaiLua.com</h3>
                    <ul>
                        <li><a href="#home" className="text-gray-700 hover:text-gray-800">Trang chủ</a></li>
                        <li><a href="#about" className="text-gray-700 hover:text-gray-800">Giới thiệu</a></li>
                        <li><a href="#recruitment" className="text-gray-700 hover:text-gray-800">Tuyển dụng</a></li>
                        <li><a href="#rules" className="text-gray-700 hover:text-gray-800">Quy chế hoạt động</a></li>
                        <li><a href="#terms" className="text-gray-700 hover:text-gray-800">Quy định sử dụng</a></li>
                        <li><a href="#privacy-policy" className="text-gray-700 hover:text-gray-800">Chính sách bảo mật</a></li>
                        <li><a href="#contact" className="text-gray-700 hover:text-gray-800">Liên hệ</a></li>
                        <li><a href="#support" className="text-gray-700 hover:text-gray-800">Hỗ trợ khách hàng</a></li>
                    </ul>
                </div>

                {/* Phần nhà đất bán */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Nhà đất bán</h3>
                    <ul>
                        <li><a href="#sell-apartment" className="text-gray-700 hover:text-gray-800">Bán căn hộ</a></li>
                        <li><a href="#sell-house" className="text-gray-700 hover:text-gray-800">Bán nhà riêng</a></li>
                        <li><a href="#sell-house-front" className="text-gray-700 hover:text-gray-800">Bán nhà mặt tiền</a></li>
                        <li><a href="#sell-villa" className="text-gray-700 hover:text-gray-800">Bán biệt thự</a></li>
                        <li><a href="#sell-land" className="text-gray-700 hover:text-gray-800">Bán đất</a></li>
                        <li><a href="#sell-project-land" className="text-gray-700 hover:text-gray-800">Bán đất nền dự án</a></li>
                        <li><a href="#sell-boarding-house" className="text-gray-700 hover:text-gray-800">Bán nhà trọ</a></li>
                        <li><a href="#sell-store" className="text-gray-700 hover:text-gray-800">Bán cửa hàng</a></li>
                        <li><a href="#sell-hotel" className="text-gray-700 hover:text-gray-800">Bán khách sạn</a></li>
                        <li><a href="#sell-warehouse" className="text-gray-700 hover:text-gray-800">Bán kho, xưởng</a></li>
                    </ul>
                </div>

                {/* Phần nhà đất cho thuê */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Nhà đất cho thuê</h3>
                    <ul>
                        <li><a href="#rent-apartment" className="text-gray-700 hover:text-gray-800">Cho thuê căn hộ</a></li>
                        <li><a href="#rent-house" className="text-gray-700 hover:text-gray-800">Thuê nhà nguyên căn</a></li>
                        <li><a href="#rent-shop" className="text-gray-700 hover:text-gray-800">Thuê nhà mặt tiền</a></li>
                        <li><a href="#rent-office" className="text-gray-700 hover:text-gray-800">Mặt bằng</a></li>
                        <li><a href="#rent-office-space" className="text-gray-700 hover:text-gray-800">Văn phòng</a></li>
                        <li><a href="#rent-room" className="text-gray-700 hover:text-gray-800">Phòng trọ</a></li>
                        <li><a href="#rent-sharing-room" className="text-gray-700 hover:text-gray-800">Ở ghép</a></li>
                        <li><a href="#rent-land" className="text-gray-700 hover:text-gray-800">Cho thuê đất</a></li>
                        <li><a href="#rent-hotel" className="text-gray-700 hover:text-gray-800">Thuê khách sạn</a></li>
                        <li><a href="#rent-warehouse" className="text-gray-700 hover:text-gray-800">Thuê kho, xưởng</a></li>
                    </ul>
                </div>

                {/* Phương thức thanh toán */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Phương thức thanh toán</h3>
                    <ul>
                        <li><a href="#online-payment" className="text-gray-700 hover:text-gray-800">Thanh toán trực tuyến</a></li>
                    </ul>
                </div>
            </div>

            {/* Thông tin bản quyền và liên hệ */}
            <div className="mt-8 text-center">
                <p>&copy; 2016 - 2025 BDSHaiLua.com. Một sản phẩm của LBKCORP</p>
                <p>Hotline: 0345476413 - Email: phamdangkhoa.21092003@gamil.com</p>
                <p>Ấp Đại Thôn A, Xã Hòa Minh, Huyện Châu Thành, Tỉnh Trà Vinh</p>
                <p>Giấy phép đăng ký kinh doanh số 0313588502 do Sở kế hoạch và Đầu tư thành phố Trà Vinh cấp ngày 30 tháng 3 năm 2023.</p>
            </div>
        </footer>
    );
};

export default Footer;
