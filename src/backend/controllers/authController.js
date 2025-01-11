const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const nodemailer = require('nodemailer');


// Đăng ký người dùng
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

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

        // Nội dung email khi đăng ký thành công
        const mailOptions = {
            from: '"BdsHaiLua Trà Vinh" <phamdangkhoa.21092003@gmail.com>',
            to: email,
            subject: 'Chúc mừng bạn đã đăng ký thành công!',
            html: `
                <h1>Chúc mừng ${name}!</h1>
                <p>Chúng tôi vui mừng thông báo rằng bạn đã đăng ký thành công vào hệ thống của chúng tôi.</p>
                <p><strong>Email:</strong> ${email}</p>
                <p>Cảm ơn bạn đã đăng ký vào hệ thống BdsHailua Trà Vinh!</p>
                <p>Trân trọng, <br>BdsHaiLua Trà Vinh</p>
            `,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully and email sent' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng dựa trên email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Tạo token chứa đầy đủ thông tin user (id, role, name, email)
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Trả về token 
        res.status(200).json({ token, id: user._id, role: user.role, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Đếm số lượng người dùng có role là "user"
exports.getUserCount = async (req, res) => {
    try {
        // Đếm số lượng người dùng có role là "user"
        const userCount = await User.countDocuments({ role: 'user' });

        // Trả về kết quả
        res.status(200).json({ userCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Lấy thông tin người dùng từ user_id trong token
exports.getUserInfo = async (req, res) => {
    try {
        // Lấy token từ header của yêu cầu
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        // Giải mã token để lấy user_id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Tìm người dùng dựa trên user_id
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Trả về thông tin người dùng
        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

