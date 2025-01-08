const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        bankCode: { type: String, default: '' },
        status: { type: String, default: 'pending' },
        transactionId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { collection: 'VNPAY' } // Đảm bảo bảng tên là VNPAY
);

module.exports = mongoose.model('Payment2', paymentSchema);
