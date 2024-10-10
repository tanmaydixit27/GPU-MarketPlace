const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'GPU' },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);
