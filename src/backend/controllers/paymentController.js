const Payment = require('../models/Payment.model');
const Transaction = require('../models/Transaction.model');

// Lấy danh sách tất cả thanh toán
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('transaction_id', 'status price')  // Kết nối với bảng Transaction để lấy thông tin giao dịch
            .lean();

        if (payments.length === 0) {
            return res.status(404).json({ message: 'Không có thanh toán nào' });
        }

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin thanh toán theo ID
exports.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id)
            .populate('transaction_id', 'status price');

        if (!payment) {
            return res.status(404).json({ message: 'Thanh toán không tồn tại' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo mới thanh toán
exports.createPayment = async (req, res) => {
    try {
        const { transaction_id, amount, payment_method, payment_date } = req.body;

        // Kiểm tra nếu transaction_id có tồn tại trong bảng Transaction
        const transaction = await Transaction.findById(transaction_id);
        if (!transaction) {
            return res.status(404).json({ message: 'Giao dịch không tồn tại' });
        }

        // Tạo mới thanh toán
        const newPayment = new Payment({
            transaction_id,
            amount,
            payment_method,
            payment_date,
        });

        const savedPayment = await newPayment.save();
        res.status(201).json({ message: 'Thanh toán đã được tạo!', payment: savedPayment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin thanh toán
exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, payment_method, payment_date } = req.body;

        const updatedPayment = await Payment.findByIdAndUpdate(id,
            { amount, payment_method, payment_date }, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Thanh toán không tồn tại' });
        }

        res.status(200).json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa thanh toán
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPayment = await Payment.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ message: 'Thanh toán không tồn tại' });
        }

        res.status(200).json({ message: 'Thanh toán đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
