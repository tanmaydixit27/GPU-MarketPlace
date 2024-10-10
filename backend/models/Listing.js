const mongoose = require('mongoose');

const GPUSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    highestBid: { type: Number, default: 0 }, // Keep track of the highest bid
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }] // Reference to bids
});

module.exports = mongoose.model('GPU', GPUSchema);
