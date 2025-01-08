const express = require('express');
const router = express.Router();
const bdsController = require('../controllers/bdsController'); // Đảm bảo đúng đường dẫn
const upload = require('../config/multerConfig'); // Import cấu hình Multer

// Lấy danh sách bất động sản
router.get('/all', bdsController.getAllBDS);

// Lấy danh sách bất động sản theo loại
router.get('/type', bdsController.getBDSByType);

// Cập nhật bất động sản (có xử lý upload ảnh)
router.put('/update/:id', upload.array('images', 5), bdsController.updateBDS);

// Xóa bất động sản
router.delete('/delete/:id', bdsController.deleteBDS);

// Định nghĩa route để lấy số lượng bất động sản
router.get('/count', bdsController.getBdsCount);



module.exports = router;
