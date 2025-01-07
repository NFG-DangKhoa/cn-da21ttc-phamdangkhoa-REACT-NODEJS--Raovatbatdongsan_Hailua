const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Lấy danh sách tất cả thanh toán
router.get('/', paymentController.getAllPayments);

// Lấy thông tin thanh toán theo ID
router.get('/:id', paymentController.getPaymentById);

// Tạo mới thanh toán
router.post('/', paymentController.createPayment);

// Cập nhật thông tin thanh toán
router.put('/:id', paymentController.updatePayment);

// Xóa thanh toán
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
