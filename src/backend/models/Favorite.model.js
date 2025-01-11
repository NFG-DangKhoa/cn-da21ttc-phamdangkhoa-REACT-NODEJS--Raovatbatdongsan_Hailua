// File: models/Favorite.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },  // Mối quan hệ với bảng User
    property_id: { type: Schema.Types.ObjectId, ref: 'BDS' },  // Mối quan hệ với bảng BDS
    createdAt: { type: Date, default: Date.now },  // Ngày tạo
    updatedAt: { type: Date, default: Date.now }   // Ngày cập nhật
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
