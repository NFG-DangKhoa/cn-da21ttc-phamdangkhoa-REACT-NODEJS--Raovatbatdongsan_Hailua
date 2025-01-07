// File: models/Payment.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    transaction_id: { type: Schema.Types.ObjectId, ref: 'Transaction' },
    amount: Number,
    payment_method: String,
    payment_date: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
