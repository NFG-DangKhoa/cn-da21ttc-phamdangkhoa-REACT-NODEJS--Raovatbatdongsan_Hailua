const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Import dotenv để sử dụng các biến môi trường
const path = require('path'); // Thêm path để dễ dàng làm việc với các đường dẫn thư mục
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// Import routes
const vnpayRoutes = require('./routes/VNPAY/vnpayRoutes');
const authRoute = require('./routes/authRoutes');
const bdsRoute = require('./routes/bdsRoutes');
const imageRoute = require('./routes/imageRoutes'); // Cập nhật tên file route từ 'imageRoutes' thành 'imagesRoutes'
const paymentRoute = require('./routes/paymentRoutes');
const buyerRoute = require('./routes/buyerRoutes'); // Cập nhật route Buyer
const sellerbdsRoute = require('./routes/sellerbdsRoutes'); // Cập nhật route Seller
const transactionRoute = require('./routes/transactionRoutes'); // Cập nhật route Transaction
const statisticsRoutes = require('./routes/statistics');

const app = express();

// Cấu hình CORS: Cho phép truy cập từ http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Cho phép frontend từ localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
}));

// Middleware để parse body của request dưới dạng JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng các routes VNPAY
app.use('/vnpay', vnpayRoutes);

// Cấu hình phục vụ các file tĩnh từ thư mục public
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch((error) => console.error('Lỗi kết nối MongoDB:', error));

// Sử dụng các route
app.use('/api/auth', authRoute);
app.use('/api/bds', bdsRoute);
app.use('/api/images', imageRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/buyers', buyerRoute); // Thêm route Buyer
app.use('/api/transactions', transactionRoute); // Thêm route Transaction
app.use('/api/sellerbds', sellerbdsRoute); // Thêm routes sellerbds
app.use('/api', statisticsRoutes);



// Khởi động server
const PORT = process.env.PORT || 5000; // Lấy cổng từ biến môi trường, nếu không có sẽ dùng cổng 5000
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
