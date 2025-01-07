//BDS.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bdsSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    area: Number,
    location: String,
    type: String,// loại bds: ví dụ như Nhà, Căn hộ,..
    status: String,// trạng thái: đang bán (hoặc đang cho thuê), đang thỏa thuận, đã bán (hoặc đã cho thuê), ẩn
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const BDS = mongoose.model('BDS', bdsSchema);
module.exports = BDS;
