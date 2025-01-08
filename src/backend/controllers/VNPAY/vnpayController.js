const crypto = require('crypto');
const querystring = require('querystring');
require('dotenv').config();  // Nạp các biến môi trường từ file .env

// Tạo đơn hàng và trả về URL thanh toán
const createOrder = (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ error: 'Số tiền không được bỏ trống!' });
    }

    const tmnCode = process.env.VNP_TMN_CODE;  // Mã Website (vnp_TmnCode)
    const secretKey = process.env.VNP_HASH_SECRET;  // Chuỗi bí mật tạo checksum (vnp_HashSecret)
    const vnpUrl = process.env.VNP_URL;  // URL thanh toán môi trường TEST
    const returnUrl = process.env.VNP_RETURN_URL;  // URL trả về sau khi thanh toán

    const date = new Date();
    const createDate = date.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const orderId = date.getTime();  // Mã đơn hàng
    const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,  // Mã đơn hàng duy nhất
        vnp_OrderInfo: 'Thanh toán đơn hàng',
        vnp_OrderType: 'billpayment',
        vnp_Amount: amount * 100,  // Số tiền cần nhân với 100 (VND)
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };

    console.log('Các tham số đã tạo:', params);

    const sortedParams = Object.keys(params)
        .sort()
        .reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});

    console.log('Các tham số đã sắp xếp:', sortedParams);

    const signData = querystring.stringify(sortedParams);

    console.log('Chuỗi signData trước khi tính chữ ký:', signData);

    // Tính toán HMAC SHA512
    const hmac = crypto.createHmac('sha512', secretKey);
    const signature = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    console.log('Chữ ký tính toán lại:', signature);

    // Tạo URL thanh toán với chữ ký
    const paymentUrl = `${vnpUrl}?${querystring.stringify(sortedParams)}&vnp_SecureHash=${signature}`;

    console.log('URL thanh toán:', paymentUrl);

    res.status(200).json({ paymentUrl });
};

// Xử lý kết quả thanh toán từ VNPAY
const paymentResult = (req, res) => {
    const { query } = req;
    const receivedSecureHash = query.vnp_SecureHash;  // Chữ ký nhận được từ VNPAY
    const secretKey = process.env.VNP_HASH_SECRET;  // Key bí mật của bạn

    // Loại bỏ chữ ký trong tham số nhận được
    const { vnp_SecureHash, ...receivedParams } = query;

    console.log('Các tham số nhận từ VNPAY:', receivedParams);

    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams = Object.keys(receivedParams)
        .sort()
        .reduce((acc, key) => {
            acc[key] = receivedParams[key];
            return acc;
        }, {});

    console.log('Các tham số đã sắp xếp nhận:', sortedParams);

    // Tạo chuỗi signData từ các tham số đã sắp xếp
    const signData = querystring.stringify(sortedParams);

    console.log('Chuỗi signData nhận được:', signData);

    // Tính toán lại chữ ký từ signData
    const recalculatedHash = crypto.createHmac('sha512', secretKey)
        .update(Buffer.from(signData, 'utf-8'))
        .digest('hex');

    console.log('Chữ ký tính toán lại từ tham số nhận:', recalculatedHash);

    // So sánh chữ ký tính toán lại và chữ ký nhận được
    if (recalculatedHash === receivedSecureHash) {
        console.log('Chữ ký hợp lệ!');
        return res.status(200).json({ message: 'Thanh toán thành công!' });
    } else {
        console.log('Chữ ký không hợp lệ!');
        return res.status(400).json({ error: 'Chữ ký không hợp lệ!' });
    }

};

module.exports = {
    createOrder,
    paymentResult
};
