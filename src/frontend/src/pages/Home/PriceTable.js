import React from 'react';

const PriceTable = () => {
    // Dữ liệu bảng giá dịch vụ
    const services = [
        {
            type: "Tin thường",
            oneDay: "2.000₫",
            fiveDays: "10.000₫",
            tenDays: "16.000₫",
            fifteenDays: "24.000₫",
            thirtyDays: "44.000₫",
            pushOnce: "2.000₫"
        },
        {
            type: "Tin VIP 3",
            oneDay: "5.000₫",
            fiveDays: "25.000₫",
            tenDays: "45.000₫",
            fifteenDays: "64.000₫",
            thirtyDays: "112.000₫",
            pushOnce: "2.000₫"
        },
        {
            type: "Tin VIP 2",
            oneDay: "10.000₫",
            fiveDays: "50.000₫",
            tenDays: "90.000₫",
            fifteenDays: "128.000₫",
            thirtyDays: "225.000₫",
            pushOnce: "3.000₫"
        },
        {
            type: "Tin VIP 1",
            oneDay: "20.000₫",
            fiveDays: "100.000₫",
            tenDays: "180.000₫",
            fifteenDays: "255.000₫",
            thirtyDays: "450.000₫",
            pushOnce: "4.000₫"
        },
        {
            type: "Tin VIP Đặc biệt",
            oneDay: "40.000₫",
            fiveDays: "200.000₫",
            tenDays: "360.000₫",
            fifteenDays: "510.000₫",
            thirtyDays: "900.000₫",
            pushOnce: "5.000₫"
        }
    ];

    return (
        <div className="container mx-auto mt-48">
            {/* Vùng tiêu đề */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 text-center rounded-t-xl shadow-lg">
                <h1 className="text-4xl font-bold text-white">Bảng Giá Dịch Vụ</h1>
            </div>

            {/* Dòng thông tin bảng giá áp dụng */}
            <div className="text-center text-xl font-semibold mb-4">
                <p>Bảng giá tin đăng áp dụng từ 13h00 ngày 01/01/2025</p>
            </div>

            {/* Bảng giá */}
            <table className="table-auto w-full text-left border-collapse mt-8 shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3 text-lg font-semibold">Loại tin</th>
                        <th className="border p-3 text-lg font-semibold">Đăng 1 ngày</th>
                        <th className="border p-3 text-lg font-semibold">Đăng 5 ngày</th>
                        <th className="border p-3 text-lg font-semibold">Đăng 10 ngày</th>
                        <th className="border p-3 text-lg font-semibold">Đăng 15 ngày</th>
                        <th className="border p-3 text-lg font-semibold">Đăng 30 ngày</th>
                        <th className="border p-3 text-lg font-semibold">Đẩy tin/lần</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-200 transition-colors duration-300`}
                        >
                            <td className="border p-3">
                                <span className={
                                    `font-bold ${service.type === "Tin thường" ? "text-blue-500" :
                                        service.type === "Tin VIP 3" ? "text-green-500" :
                                            service.type === "Tin VIP 2" ? "text-purple-400" :
                                                service.type === "Tin VIP 1" ? "text-orange-500" :
                                                    "text-orange-700"
                                    }`}>
                                    {service.type}
                                </span>
                            </td>
                            <td className="border p-3">{service.oneDay}</td>
                            <td className="border p-3">{service.fiveDays}</td>
                            <td className="border p-3">{service.tenDays}</td>
                            <td className="border p-3">{service.fifteenDays}</td>
                            <td className="border p-3">{service.thirtyDays}</td>
                            <td className="border p-3">{service.pushOnce}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
