// controllers/VNPAY/returnController.js
const crypto = require('crypto');
const querystring = require('querystring');
require('dotenv').config();  // Nạp các biến môi trường từ file .env

const handlePaymentResult = (req, res) => {
    const queryParams = req.query; // Lấy các tham số trả về từ VNPAY
    const { vnp_ResponseCode, vnp_TransactionNo, vnp_TxnRef } = queryParams;

    // Kiểm tra kết quả thanh toán từ VNPAY
    if (vnp_ResponseCode === '00') {
        // Thanh toán thành công
        res.status(200).json({
            message: 'Thanh toán thành công!',
            transactionNo: vnp_TransactionNo,
            txnRef: vnp_TxnRef,
        });
    } else {
        // Thanh toán thất bại
        res.status(400).json({
            message: 'Thanh toán thất bại!',
            transactionNo: vnp_TransactionNo,
            txnRef: vnp_TxnRef,
        });
    }
};

module.exports = { handlePaymentResult };
