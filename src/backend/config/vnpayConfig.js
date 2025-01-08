// config/vnpayConfig.js
require('dotenv').config(); // Đảm bảo dotenv được nạp để sử dụng biến môi trường

module.exports = {
    vnp_TmnCode: process.env.VNP_TMN_CODE,
    vnp_HashSecret: process.env.VNP_HASH_SECRET,
    vnp_Url: process.env.VNP_URL,
    vnp_ReturnUrl: process.env.VNP_RETURN_URL,
};
