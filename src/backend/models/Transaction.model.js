const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    bds_id: { type: Schema.Types.ObjectId, ref: 'BDS' },
    seller_id: { type: Schema.Types.ObjectId, ref: 'Seller' },
    buyer_id: { type: Schema.Types.ObjectId, ref: 'Buyer' },
    transaction_date: Date,
    price: Number,
    status: String,
    transaction_method: {
        type: String,
        enum: ['sell', 'rent'],
        required: true // Bắt buộc có
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
