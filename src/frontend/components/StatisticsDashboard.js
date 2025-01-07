import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StatisticsDashboard = () => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/statistics');
                if (!response.ok) throw new Error('Failed to fetch statistics');
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setStatistics({ error: true });
            }
        };

        fetchStatistics();
    }, []);

    if (!statistics) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (statistics.error) {
        return <div>Error loading statistics. Please try again later.</div>;
    }

    const formattedRevenue = (statistics.totalRevenue / 1e9).toFixed(2); // Định dạng doanh thu (tỷ)

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
        labels: ['Total Revenue (Billion)'],
        datasets: [
            {
                label: 'Revenue (Billion)',
                data: [formattedRevenue],
                backgroundColor: '#FF5722'
            }
        ]
    };

    return (
        <div className="flex">
            {/* Main Content */}
            <div className="w-3/4 p-6 ml-16">  {/* Thêm class ml-16 để di chuyển sang phải nhiều hơn */}
                <h2 className="text-2xl font-bold mb-6">Statistics Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Biểu đồ tròn */}
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

                    {/* Biểu đồ cột */}
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
                </div>
            </div>
        </div>


    );
};

export default StatisticsDashboard;
