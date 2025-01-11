// File: models/User.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },           // Tên người dùng
    email: { type: String, unique: true, required: true },  // Email (duy nhất)
    password: { type: String, required: true },       // Mật khẩu
    role: {
        type: String,
        enum: ['admin', 'user'],  // Vai trò người dùng (admin hoặc user)
        default: 'user'           // Vai trò mặc định là user
    },
    createdAt: { type: Date, default: Date.now },  // Ngày tạo
    updatedAt: { type: Date, default: Date.now },  // Ngày cập nhật
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }]  // Mối quan hệ với bảng Favorite
});

const User = mongoose.model('User', userSchema);
module.exports = User;
