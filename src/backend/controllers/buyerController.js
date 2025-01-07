//buyerController.js
const Buyer = require('../models/Buyer.model');
const User = require('../models/User.model');

// Lấy danh sách tất cả Buyer
exports.getAllBuyers = async (req, res) => {
    try {
        const buyers = await Buyer.find()
            .populate('user_id', 'name email phone address') // Kết nối với bảng User để lấy thông tin người dùng
            .lean();  // Đảm bảo dữ liệu có thể sửa đổi

        res.status(200).json(buyers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin Buyer theo ID
exports.getBuyerById = async (req, res) => {
    try {
        const { id } = req.params;
        const buyer = await Buyer.findById(id)
            .populate('user_id', 'name email phone address');  // Lấy thông tin người dùng liên kết

        if (!buyer) {
            return res.status(404).json({ message: 'Buyer không tồn tại' });
        }

        res.status(200).json(buyer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo mới Buyer
exports.createBuyer = async (req, res) => {
    try {
        const { user_id, name, phone, email, address } = req.body;

        // Kiểm tra nếu user_id đã có trong bảng User
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User không tồn tại' });
        }

        // Tạo mới Buyer
        const newBuyer = new Buyer({
            user_id,
            name,
            phone,
            email,
            address,
        });

        const savedBuyer = await newBuyer.save();
        res.status(201).json({ message: 'Buyer đã được tạo!', buyer: savedBuyer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin Buyer
exports.updateBuyer = async (req, res) => {
    try {
        const { id } = req.params;  // Lấy id từ params
        const updatedBuyer = await Buyer.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBuyer) {
            return res.status(404).json({ message: 'Buyer không tồn tại' });
        }

        res.status(200).json(updatedBuyer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa Buyer
exports.deleteBuyer = async (req, res) => {
    try {
        const { id } = req.params;  // Lấy id từ params
        const deletedBuyer = await Buyer.findByIdAndDelete(id);

        if (!deletedBuyer) {
            return res.status(404).json({ message: 'Buyer không tồn tại' });
        }

        res.status(200).json({ message: 'Buyer đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
