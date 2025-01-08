//buyerRoutes
const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');

// Lấy danh sách tất cả Buyer
router.get('/', buyerController.getAllBuyers);

// Lấy thông tin Buyer theo ID
router.get('/:id', buyerController.getBuyerById);

// Tạo mới Buyer
router.post('/', buyerController.createBuyer);

// Cập nhật thông tin Buyer
router.put('/:id', buyerController.updateBuyer);

// Xóa Buyer
router.delete('/:id', buyerController.deleteBuyer);

module.exports = router;
