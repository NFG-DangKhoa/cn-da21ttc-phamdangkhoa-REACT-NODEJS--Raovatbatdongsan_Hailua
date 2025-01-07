const Seller = require('../models/Seller.model');
const Buyer = require('../models/Buyer.model');
const Payment = require('../models/Payment.model');

const getStatistics = async (req, res) => {
    try {
        const sellerCount = await Seller.countDocuments();
        const buyerCount = await Buyer.countDocuments();
        const totalRevenue = await Payment.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        res.status(200).json({
            sellerCount,
            buyerCount,
            totalRevenue: totalRevenue[0]?.total || 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStatistics };
