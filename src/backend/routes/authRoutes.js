const express = require('express');
const { register, login } = require('../controllers/authController');
const { getUserCount } = require('../controllers/authController'); // Import thêm controller

const router = express.Router();

// Đăng ký người dùng
router.post('/register', register);

// Đăng nhập người dùng
router.post('/login', login);

// Lấy số lượng người dùng có role là "user"
router.get('/user-count', getUserCount);  // Thêm route mới

module.exports = router;
