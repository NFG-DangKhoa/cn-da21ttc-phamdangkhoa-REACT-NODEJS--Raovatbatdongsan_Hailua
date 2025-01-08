const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

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
        res.status(201).json({ message: 'User registered successfully' });
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
