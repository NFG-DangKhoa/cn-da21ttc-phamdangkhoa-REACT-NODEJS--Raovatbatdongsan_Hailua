const nodemailer = require('nodemailer');

// Hàm gửi email
const sendOrderConfirmationEmail = async ({ email, orderDetails }) => {
    // Cấu hình SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'phamdangkhoa.21092003@gmail.com', // Email gửi
            pass: 'hsxi sluc rvjk rrhg',   // Mật khẩu ứng dụng
        },
    });

    try {
        // Lọc các thông số quan trọng từ orderDetails (giả định là một object)
        const vnpayData = JSON.parse(orderDetails); // Nếu orderDetails là JSON string
        const { vnp_Amount, vnp_TransactionNo, vnp_TxnRef, vnp_BankCode, vnp_CardType, vnp_PayDate } = vnpayData;

        // Chuyển đổi số tiền từ VNPAY (chia cho 100 để chuyển sang đơn vị VND)
        const amountInVND = vnp_Amount / 100;

        // Chuyển đổi thời gian thanh toán (timestamp) sang định dạng thời gian thực
        const timestamp = vnp_PayDate.toString();
        const year = timestamp.substring(0, 4);
        const month = timestamp.substring(4, 6) - 1; // Tháng trong JavaScript bắt đầu từ 0
        const day = timestamp.substring(6, 8);
        const hour = timestamp.substring(8, 10);
        const minute = timestamp.substring(10, 12);
        const second = timestamp.substring(12, 14);

        // Tạo đối tượng Date
        const date = new Date(year, month, day, hour, minute, second);

        // Định dạng ngày theo kiểu `dd/MM/yyyy, HH:mm:ss`
        const formattedPayDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

        // Nội dung email
        const mailOptions = {
            from: '"BdsHaiLua Trà Vinh" <phamdangkhoa.21092003@gmail.com>',
            to: email,
            subject: 'Xác nhận đơn hàng',
            html: `
                <h1>Chúc mừng! Bạn đã thanh toán thành công phí đăng tin bất động sản!</h1>
                <p>Dưới đây là chi tiết đơn hàng của bạn:</p>
                <ul>
                    <li><strong>Số tiền:</strong> ${amountInVND} VND</li>
                    <li><strong>Mã giao dịch:</strong> ${vnp_TransactionNo}</li>
                    <li><strong>Mã đơn hàng:</strong> ${vnp_TxnRef}</li>
                    <li><strong>Mã ngân hàng:</strong> ${vnp_BankCode}</li>
                    <li><strong>Loại thẻ:</strong> ${vnp_CardType}</li>
                    <li><strong>Thời gian thanh toán:</strong> ${formattedPayDate}</li>
                </ul>
                <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            `,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        return { status: 200, message: 'Email đã được gửi thành công!' };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Lỗi khi gửi email', error };
    }
};

module.exports = { sendOrderConfirmationEmail };
