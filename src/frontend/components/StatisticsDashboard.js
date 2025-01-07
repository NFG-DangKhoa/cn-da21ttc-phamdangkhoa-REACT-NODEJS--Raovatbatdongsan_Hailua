import React, { useEffect, useState } from 'react';
import { Pie, Doughnut, Bar } from 'react-chartjs-2'; // Import thêm Doughnut
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StatisticsDashboard = () => {
    const [statistics, setStatistics] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('day');
    const [filteredRevenue, setFilteredRevenue] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/statistics');
                if (!response.ok) throw new Error('Failed to fetch statistics');
                const data = await response.json();
                setStatistics(data);
                setFilteredRevenue(data.dailyRevenue);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setStatistics({ error: true });
            }
        };

        fetchStatistics();
    }, []);

    const handleFilterChange = (e) => {
        const filter = e.target.value;
        setSelectedFilter(filter);

        if (statistics) {
            let revenue = 0;
            switch (filter) {
                case 'day':
                    revenue = statistics.dailyRevenue;
                    break;
                case 'week':
                    revenue = statistics.weeklyRevenue;
                    break;
                case 'month':
                    revenue = statistics.monthlyRevenue;
                    break;
                case 'year':
                    revenue = statistics.yearlyRevenue;
                    break;
                default:
                    break;
            }
            setFilteredRevenue(revenue);
        }
    };

    if (!statistics) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (statistics.error) {
        return <div>Error loading statistics. Please try again later.</div>;
    }

    // Dữ liệu cho biểu đồ bất động sản theo loại
    const bdsDonutData = {
        labels: statistics.bdsStatistics ? statistics.bdsStatistics.map((item) => item._id) : [],
        datasets: [
            {
                data: statistics.bdsStatistics ? statistics.bdsStatistics.map((item) => item.count) : [],
                backgroundColor: [
                    '#FF7043', '#FFEB3B', '#26C6DA', '#7E57C2', '#FF4081',
                    '#FFCA28', '#0288D1', '#43A047', '#FF5722', '#9C27B0'
                ],
                borderWidth: 1,
                borderColor: '#ffffff',
            }
        ]
    };
    const pieData = {
        labels: ['Sellers', 'Buyers'],
        datasets: [
            {
                data: [statistics.sellerCount, statistics.buyerCount],
                backgroundColor: ['#4CAF50', '#2196F3']
            }
        ]
    };

    const barData = {
        labels: ['Total Revenue (VNĐ)'],
        datasets: [
            {
                label: 'Revenue',
                data: [statistics.totalRevenue],
                backgroundColor: '#FF5722'
            }
        ]
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">BẤT ĐỘNG SẢN HAI LÚA TRÀ VINH</h2>

            {/* Tổng quan */}
            <h3 className="text-2xl font-bold mb-6">TỔNG QUAN</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Tổng số người dùng</h3>
                    <p className="text-2xl font-bold text-indigo-500">
                        {statistics.totalUsers.toLocaleString()} Users
                    </p>
                </div>
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Tổng số giao dịch</h3>
                    <p className="text-2xl font-bold text-purple-500">
                        {statistics.transactionCount.toLocaleString()} Transactions
                    </p>
                </div>
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Tổng doanh thu (VNĐ)</h3>
                    <p className="text-2xl font-bold text-green-500">
                        {statistics.totalRevenue.toLocaleString()} VND
                    </p>
                </div>
            </div>

            {/* Thống kê */}
            <h3 className="text-2xl font-bold mb-6">THỐNG KÊ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sellers vs Buyers */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Sellers vs Buyers</h3>
                    <div className="flex justify-center">
                        <Pie
                            data={pieData}
                            options={{ maintainAspectRatio: false }}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Revenue</h3>
                    <div className="flex justify-center">
                        <Bar
                            data={barData}
                            options={{ maintainAspectRatio: false }}
                            width={300}
                            height={200}
                        />
                    </div>
                </div>

                {/* Biểu đồ bất động sản theo loại (Donut) */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Bất động sản theo loại</h3>
                    <div className="flex justify-center">
                        <Doughnut
                            data={bdsDonutData} // Sử dụng Doughnut ở đây
                            options={{ maintainAspectRatio: false }}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>

                {/* Bộ lọc */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Bộ lọc</h3>
                    <select
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                    >
                        <option value="day">Theo ngày</option>
                        <option value="week">Theo tuần</option>
                        <option value="month">Theo tháng</option>
                        <option value="year">Theo năm</option>
                    </select>
                </div>

                {/* Lọc doanh thu */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Lọc doanh thu (VNĐ)</h3>
                    <p className="text-2xl font-bold text-blue-500">
                        {(filteredRevenue * 1).toLocaleString()} VND
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsDashboard;
