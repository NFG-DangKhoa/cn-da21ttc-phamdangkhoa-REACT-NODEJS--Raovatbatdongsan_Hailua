// config/multerConfig.js
const multer = require('multer');
const path = require('path');

// Cấu hình lưu ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');  // Lưu vào thư mục images/bds
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Đặt tên file là timestamp + extension
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Lỗi: Chỉ hỗ trợ các file hình ảnh (jpg, jpeg, png)');
        }
    }
});

module.exports = upload;
