const multer = require('multer');
const path = require('path');

// Định nghĩa nơi lưu trữ và tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Đường dẫn thư mục lưu trữ file
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Tên file duy nhất
    },
});

// Middleware kiểm tra file upload
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload ảnh định dạng JPEG, JPG, hoặc PNG!'), false);
    }
};

// Tạo instance của Multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // Giới hạn file 2MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
