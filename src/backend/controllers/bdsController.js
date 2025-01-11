const BDS = require('../models/BDS.model');
const Image = require('../models/Images.model');
const User = require('../models/User.model');
const Transaction = require('../models/Transaction.model');
const fs = require('fs');
const Seller = require('../models/Seller.model');
const upload = require('../config/multerConfig'); // Import cấu hình Multer
const multer = require('multer');
const path = require('path');




// Lấy danh sách bất động sản và phân loại theo transaction_method
const getAllBDS = async (req, res) => {
    try {
        // Lấy danh sách BĐS với trạng thái "đang bán", "đang cho thuê" và "nổi bật"
        const bdsForSale = await BDS.find({ status: 'đang bán' }).lean();
        const bdsForRent = await BDS.find({ status: 'đang cho thuê' }).lean();
        const bdsFeatured = await BDS.find({ status: 'nổi bật' }).lean();

        // Lấy ảnh chính (is_main: true) cho mỗi BĐS
        for (const bds of bdsForSale.concat(bdsForRent).concat(bdsFeatured)) {
            const images = await Image.find({ bds_id: bds._id, is_main: true });
            bds.images = images.map((img) => img.url);
        }

        res.status(200).json({ forSale: bdsForSale, forRent: bdsForRent, featured: bdsFeatured });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Hàm để lấy số lượng bất động sản theo loại
const getBdsCount = async (req, res) => {
    try {
        const forSaleCount = await BDS.countDocuments({ status: 'đang bán' });
        const forRentCount = await BDS.countDocuments({ status: 'đang cho thuê' });
        const featuredCount = await BDS.countDocuments({ status: 'nổi bật' });

        res.json({ forSaleCount, forRentCount, featuredCount });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy số lượng bất động sản' });
    }
};




const getBDSByType = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({ message: 'Vui lòng cung cấp type!' });
        }

        const transactions = await Transaction.find().lean();
        const bdsForSaleIds = transactions.filter(transaction => transaction.transaction_method === 'sell').map(transaction => transaction.bds_id);
        const bdsForRentIds = transactions.filter(transaction => transaction.transaction_method === 'rent').map(transaction => transaction.bds_id);

        const bdsForSale = await BDS.find({ _id: { $in: bdsForSaleIds }, type }).lean();
        const bdsForRent = await BDS.find({ _id: { $in: bdsForRentIds }, type }).lean();

        for (const bds of bdsForSale.concat(bdsForRent)) {
            const images = await Image.find({ bds_id: bds._id });
            bds.images = images.map((img) => img.url);
        }

        res.status(200).json({ forSale: bdsForSale, forRent: bdsForRent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const updateBDS = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBDS = await BDS.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBDS) {
            return res.status(404).json({ message: 'Bất động sản không tồn tại' });
        }

        const images = await Image.find({ bds_id: id });
        updatedBDS.images = images.map((img) => img.url);

        res.status(200).json(updatedBDS);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBDS = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBDS = await BDS.findByIdAndDelete(id);

        if (!deletedBDS) {
            return res.status(404).json({ message: 'Bất động sản không tồn tại' });
        }

        await Image.deleteMany({ bds_id: id });

        res.status(200).json({ message: 'Bất động sản đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hàm lấy thông tin người bán dựa vào bds_id
const getSellerByBdsId = async (req, res) => {
    try {
        const { bds_id } = req.params;

        // Tìm transaction có bds_id tương ứng
        const transaction = await Transaction.findOne({ bds_id }).lean();

        if (!transaction || !transaction.seller_id) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin người bán cho bất động sản này' });
        }

        // Tìm thông tin người bán dựa vào seller_id
        const seller = await Seller.findById(transaction.seller_id).lean();

        if (!seller) {
            return res.status(404).json({ message: 'Người bán không tồn tại' });
        }

        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBDS,
    getBDSByType,
    updateBDS,
    deleteBDS,
    getBdsCount,
    getSellerByBdsId, // Thêm hàm này
};
