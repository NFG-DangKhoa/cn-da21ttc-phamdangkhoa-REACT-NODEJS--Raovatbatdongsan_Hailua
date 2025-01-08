const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Lấy danh sách tất cả giao dịch
router.get('/', transactionController.getAllTransactions);

// Lấy thông tin giao dịch theo ID
router.get('/:id', transactionController.getTransactionById);

// Tạo mới giao dịch
router.post('/', transactionController.createTransaction);

// Cập nhật thông tin giao dịch
router.put('/:id', transactionController.updateTransaction);

// Xóa giao dịch
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
