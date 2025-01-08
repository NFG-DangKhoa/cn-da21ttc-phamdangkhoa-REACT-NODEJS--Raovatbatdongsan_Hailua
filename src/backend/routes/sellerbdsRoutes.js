const express = require('express');
const router = express.Router();
const { createBDS, getSellerInfo } = require('../controllers/sellerbdsController'); // Thêm getSellerInfo
const upload = require('../config/multerConfig');  // Cấu hình multer để xử lý upload ảnh
const authMiddleware = require('../middleware/authMiddleware');  // Middleware để xác thực token

// Route tạo mới BĐS
router.post('/create', authMiddleware, upload.array('images', 3), createBDS);

// Route lấy thông tin người bán
router.get('/seller-info', authMiddleware, getSellerInfo);

module.exports = router;
