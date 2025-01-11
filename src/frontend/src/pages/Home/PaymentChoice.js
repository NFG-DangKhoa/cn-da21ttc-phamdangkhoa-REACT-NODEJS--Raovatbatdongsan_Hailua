import React from 'react';

const PaymentChoice = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Link hướng dẫn thanh toán */}
                <div className="text-center mb-4">
                    <a href="#huong-dan-thanh-toan" className="text-blue-500 text-lg font-semibold hover:underline">
                        Hướng dẫn thanh toán
                    </a>
                </div>

                {/* Câu hỏi lựa chọn */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Bạn muốn đăng tin miễn phí hay qua thanh toán?</h2>
                </div>

                {/* 2 Nút lựa chọn */}
                <div className="flex justify-center gap-4">
                    {/* Nút đăng tin miễn phí */}
                    <a href="/create-bds" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        Đăng tin miễn phí
                    </a>

                    {/* Nút đăng tin qua thanh toán */}
                    <a href="/payment-form" className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                        Đăng tin qua thanh toán
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentChoice;
