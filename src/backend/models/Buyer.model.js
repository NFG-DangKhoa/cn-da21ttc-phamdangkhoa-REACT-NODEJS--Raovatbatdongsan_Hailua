// File: models/Buyer.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    phone: String,
    email: String,
    address: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;
