const Seller = require('../models/Seller.model');
const Buyer = require('../models/Buyer.model');
const Payment = require('../models/Payment.model');
const Transaction = require('../models/Transaction.model');
const BDS = require('../models/BDS.model'); // Thêm model BDS

const getStatistics = async (req, res) => {
    try {
        // Đếm tổng số Seller và Buyer
        const sellerCount = await Seller.countDocuments();
        const buyerCount = await Buyer.countDocuments();
        const totalUsers = sellerCount + buyerCount;

        // Đếm tổng số giao dịch
        const transactionCount = await Transaction.countDocuments();

        // Tính tổng doanh thu
        const totalRevenueResult = await Payment.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = totalRevenueResult[0]?.total || 0;

        // Lấy ngày hiện tại
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startOfYear = new Date(today.getFullYear(), 0, 1);

        // Tính doanh thu theo khoảng thời gian
        const dailyRevenue = await Payment.aggregate([
            { $match: { createdAt: { $gte: startOfDay } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const weeklyRevenue = await Payment.aggregate([
            { $match: { createdAt: { $gte: startOfWeek } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const monthlyRevenue = await Payment.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const yearlyRevenue = await Payment.aggregate([
            { $match: { createdAt: { $gte: startOfYear } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Tính số lượng bất động sản theo loại (type) hoặc loại 'No Type' nếu không có trường type
        const bdsStatistics = await BDS.aggregate([
            {
                $project: {
                    type: { $ifNull: ["$type", "No Type"] } // Nếu không có type, dùng "No Type" thay thế
                }
            },
            {
                $group: {
                    _id: "$type", // Nhóm theo type
                    count: { $sum: 1 } // Đếm số lượng bất động sản theo từng loại
                }
            }
        ]);

        // Lấy giá trị doanh thu hoặc 0 nếu không có kết quả
        const formatRevenue = (result) => (result[0]?.total || 0);
        const filteredDailyRevenue = formatRevenue(dailyRevenue);
        const filteredWeeklyRevenue = formatRevenue(weeklyRevenue);
        const filteredMonthlyRevenue = formatRevenue(monthlyRevenue);
        const filteredYearlyRevenue = formatRevenue(yearlyRevenue);

        // Trả về kết quả JSON
        res.status(200).json({
            sellerCount,
            buyerCount,
            totalUsers,
            transactionCount,
            totalRevenue,
            dailyRevenue: filteredDailyRevenue,
            weeklyRevenue: filteredWeeklyRevenue,
            monthlyRevenue: filteredMonthlyRevenue,
            yearlyRevenue: filteredYearlyRevenue,
            bdsStatistics // Thống kê bất động sản theo type
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStatistics };
