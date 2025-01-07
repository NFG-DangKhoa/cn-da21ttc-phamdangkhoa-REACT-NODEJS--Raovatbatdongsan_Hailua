import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        vnp_Amount: "",
        vnp_OrderInfo: "",
        vnp_OrderType: "billpayment",
        vnp_Bill_Mobile: "",
        vnp_Bill_Email: "",
        vnp_Bill_FirstName: "",
        vnp_Bill_LastName: "",
        vnp_Bill_Address: "",
        vnp_Bill_City: "",
        vnp_Bill_Country: "VN",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Bắt đầu loading
        setError(null); // Reset lỗi trước khi gửi yêu cầu

        try {
            const response = await axios.post(
                "http://localhost:5000/vnpay/payment/create",
                {
                    ...formData,
                    vnp_Amount: parseInt(formData.vnp_Amount, 10) * 100, // Chuyển đổi VND * 100
                    vnp_CreateDate: new Date().toISOString().replace(/[-:.]/g, "").slice(0, 14), // Định dạng: yyyyMMddHHmmss
                    vnp_IpAddr: "127.0.0.1", // IP giả khi đang phát triển, thay bằng IP thực khi triển khai
                }
            );

            // Điều hướng tới URL thanh toán
            window.location.href = response.data.paymentUrl;
        } catch (error) {
            setError("Đã có lỗi xảy ra khi tạo URL thanh toán!"); // Hiển thị lỗi
            console.error("Error creating payment URL:", error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Thanh Toán VNPAY</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Các trường nhập liệu */}
                <div>
                    <label className="block font-medium">Số tiền (VND)</label>
                    <input
                        type="number"
                        name="vnp_Amount"
                        value={formData.vnp_Amount}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        placeholder="Nhập số tiền"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Thông tin đơn hàng</label>
                    <input
                        type="text"
                        name="vnp_OrderInfo"
                        value={formData.vnp_OrderInfo}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        placeholder="Mô tả đơn hàng"
                        required
                    />
                </div>
                {/* Các trường khác tương tự như Số điện thoại, Email, Địa chỉ, Thành phố, Quốc gia... */}

                {/* Hiển thị lỗi nếu có */}
                {error && <div className="text-red-500 text-center">{error}</div>}

                {/* Nút thanh toán */}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading} // Disable khi đang gửi yêu cầu
                >
                    {loading ? "Đang thanh toán..." : "Thanh toán"}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
