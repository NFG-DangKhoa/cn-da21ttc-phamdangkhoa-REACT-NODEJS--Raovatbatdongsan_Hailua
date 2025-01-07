// File: models/Images.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    bds_id: { type: Schema.Types.ObjectId, ref: 'BDS' }, // Liên kết với bảng BDS
    url: { type: String, required: true }, // Đường dẫn URL của hình ảnh
    is_main: { type: Boolean, required: true }, // Ảnh chính hay ảnh phụ
    createdAt: { type: Date, default: Date.now } // Ngày tạo
});

const Images = mongoose.model('Images', imageSchema);
module.exports = Images;


