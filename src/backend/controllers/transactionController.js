const Transaction = require('../models/Transaction.model');
const BDS = require('../models/BDS.model');
const Seller = require('../models/Seller.model');
const Buyer = require('../models/Buyer.model');

// Lấy danh sách tất cả giao dịch
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('bds_id', 'title price')  // Kết nối với bảng BDS
            .populate('seller_id', 'name email phone')  // Kết nối với bảng Seller
            .populate('buyer_id', 'name email phone')  // Kết nối với bảng Buyer
            .lean();  // Đảm bảo dữ liệu có thể sửa đổi

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin giao dịch theo ID
exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id)
            .populate('bds_id', 'title price')
            .populate('seller_id', 'name email phone')
            .populate('buyer_id', 'name email phone');

        if (!transaction) {
            return res.status(404).json({ message: 'Giao dịch không tồn tại' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo mới giao dịch
exports.createTransaction = async (req, res) => {
    try {
        const { bds_id, seller_id, buyer_id, transaction_date, price, status, transaction_method } = req.body;

        // Kiểm tra nếu bds_id, seller_id, buyer_id đều tồn tại
        const bds = await BDS.findById(bds_id);
        const seller = await Seller.findById(seller_id);
        const buyer = await Buyer.findById(buyer_id);

        if (!bds || !seller || !buyer) {
            return res.status(404).json({ message: 'Bất động sản, Người bán hoặc Người mua không tồn tại' });
        }

        // Kiểm tra nếu `transaction_method` hợp lệ
        if (!['sell', 'rent'].includes(transaction_method)) {
            return res.status(400).json({ message: 'Phương thức giao dịch không hợp lệ' });
        }

        // Tạo mới giao dịch
        const newTransaction = new Transaction({
            bds_id,
            seller_id,
            buyer_id,
            transaction_date,
            price,
            status,
            transaction_method
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json({ message: 'Giao dịch đã được tạo!', transaction: savedTransaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin giao dịch
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;  // Lấy id từ params

        // Kiểm tra nếu có `transaction_method` trong body
        if (req.body.transaction_method && !['sell', 'rent'].includes(req.body.transaction_method)) {
            return res.status(400).json({ message: 'Phương thức giao dịch không hợp lệ' });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Giao dịch không tồn tại' });
        }

        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa giao dịch
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;  // Lấy id từ params
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Giao dịch không tồn tại' });
        }

        res.status(200).json({ message: 'Giao dịch đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
