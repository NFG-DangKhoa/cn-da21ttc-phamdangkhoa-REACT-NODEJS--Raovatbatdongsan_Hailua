import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        amount: "",
        bankCode: "",
        language: "vn",
        propertyName: "",
        traderName: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Bước 1: Gửi email
            await axios.post("http://localhost:5000/vnpay/save_email", {
                email: formData.email,
            });

            // Bước 2: Sau khi email đã được lưu, tạo URL thanh toán
            const response = await axios.post(
                "http://localhost:5000/vnpay/create_payment_url",
                formData
            );

            const { vnpUrl } = response.data;
            if (vnpUrl) {
                window.location.href = vnpUrl; // Điều hướng đến URL VNPAY
            }
        } catch (error) {
            console.error("Error creating payment URL:", error);
            alert("Đã xảy ra lỗi khi tạo URL thanh toán.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
                Tạo mới đơn hàng
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="propertyName" className="block text-gray-700 font-medium">
                        Tên bất động sản:
                    </label>
                    <input
                        type="text"
                        id="propertyName"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="traderName" className="block text-gray-700 font-medium">
                        Tên người giao dịch:
                    </label>
                    <input
                        type="text"
                        id="traderName"
                        name="traderName"
                        value={formData.traderName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium">
                        Số tiền (VND):
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="bankCode" className="block text-gray-700 font-medium">
                        Mã ngân hàng:
                    </label>
                    <input
                        type="text"
                        id="bankCode"
                        name="bankCode"
                        value={formData.bankCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="language" className="block text-gray-700 font-medium">
                        Ngôn ngữ:
                    </label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="vn">Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Gửi
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
