const jwt = require('jsonwebtoken');

// Middleware xác thực người dùng
const authMiddleware = (req, res, next) => {
    try {
        // 1. Lấy token từ header Authorization
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader); // Log header để kiểm tra

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token không được cung cấp hoặc không hợp lệ' });
        }

        const token = authHeader.split(' ')[1]; // Loại bỏ 'Bearer ' để lấy token
        console.log("Token xác thực: ", token); // Log token để kiểm tra
        console.log(process.env.JWT_SECRET);  // Kiểm tra xem giá trị có đúng không


        // 2. Xác thực và giải mã token
        const secretKey = process.env.JWT_SECRET; // Secret key của bạn  
        console.log('Secret Key:', secretKey);  // In ra secret key để kiểm tra
        const decoded = jwt.verify(token, secretKey);

        // 3. Gắn thông tin user vào request
        req.user = decoded;  // Đưa thông tin user vào req.user
        // In ra để kiểm tra
        console.log(decoded); // Kiểm tra xem dữ liệu có chính xác không

        next();  // Tiến hành các bước tiếp theo
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

module.exports = authMiddleware;
