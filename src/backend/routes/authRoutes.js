const express = require('express');
const { register, login } = require('../controllers/authController');
const { getUserCount } = require('../controllers/authController'); // Import thêm controller
const { getUserInfo } = require('../controllers/authController');

const router = express.Router();

// Đăng ký người dùng
router.post('/register', register);

// Đăng nhập người dùng
router.post('/login', login);

// Lấy số lượng người dùng có role là "user"
router.get('/user-count', getUserCount);  // Thêm route mới

// Route để lấy thông tin người dùng
router.get('/user-info', getUserInfo);  // Đường dẫn cho API lấy thông tin người dùng

module.exports = router;
