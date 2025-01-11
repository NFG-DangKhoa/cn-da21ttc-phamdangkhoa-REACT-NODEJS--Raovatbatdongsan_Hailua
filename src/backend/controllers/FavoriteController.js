const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Favorite = require('../models/Favorite.model');
const User = require('../models/User.model');



// Lưu tạm dữ liệu trong bộ nhớ server (tempStorage)
let tempStorage = {};

const saveAndCheckFavorite = async (req, res) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        // Giải mã token để lấy userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { propertyId } = req.body;

        // Kiểm tra định dạng ObjectId
        if (!mongoose.Types.ObjectId.isValid(propertyId)) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
        }

        // Lưu propertyId và userId vào bộ nhớ tạm thời
        tempStorage[userId] = { propertyId };

        console.log("Temp Data:", tempStorage[userId]); // In ra biến tạm để kiểm tra

        // Kiểm tra xem bất động sản đã có trong danh sách yêu thích của user chưa
        const existingFavorite = await Favorite.findOne({ user: userId, property_id: propertyId });
        if (existingFavorite) {
            return res.status(200).json({ success: true, isFavorited: true });
        }

        res.status(200).json({ success: true, isFavorited: false });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xử lý dữ liệu.', error: error.message });
    }
};





// Thêm bất động sản vào danh sách yêu thích
const addFavorite = async (req, res) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        // Giải mã token để lấy userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { propertyId } = req.body;

        // Kiểm tra định dạng ObjectId
        if (!mongoose.Types.ObjectId.isValid(propertyId)) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
        }

        // Kiểm tra xem bất động sản đã được yêu thích chưa
        const existingFavorite = await Favorite.findOne({ user: userId, property_id: propertyId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'Bất động sản này đã có trong danh sách yêu thích.' });
        }

        // Tạo một favorite mới
        const newFavorite = new Favorite({
            user: userId,
            property_id: propertyId
        });

        // Lưu favorite vào bảng
        await newFavorite.save();

        // Cập nhật user để thêm vào danh sách yêu thích
        const user = await User.findById(userId);
        user.favorites.push(newFavorite._id);
        await user.save();

        res.status(200).json({ message: 'Đã thêm vào danh sách yêu thích!', favorite: newFavorite });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm vào yêu thích.', error: error.message });
    }
};

// Lấy danh sách bất động sản yêu thích
const getFavorites = async (req, res) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'No token provided' });

        // Giải mã token để lấy userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Kiểm tra định dạng ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
        }

        // Lấy user và populate với danh sách yêu thích
        const user = await User.findById(userId).populate({
            path: 'favorites',
            populate: { path: 'property_id' }
        });

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách yêu thích.', error: error.message });
    }
};




module.exports = {
    addFavorite,
    getFavorites,
    saveAndCheckFavorite,
};
