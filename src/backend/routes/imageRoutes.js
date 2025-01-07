const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imageController');

// Lấy danh sách tất cả hình ảnh của BDS
router.get('/', imagesController.getAllImages);

// Lấy thông tin hình ảnh theo ID
router.get('/:id', imagesController.getImageById);

// Tạo mới hình ảnh
router.post('/', imagesController.createImage);

// Cập nhật thông tin hình ảnh
router.put('/:id', imagesController.updateImage);

// Xóa hình ảnh
router.delete('/:id', imagesController.deleteImage);

module.exports = router;
