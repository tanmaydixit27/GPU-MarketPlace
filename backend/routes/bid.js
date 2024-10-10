const express = require('express');
const jwt = require('jsonwebtoken');
const Bid = require('../models/Bid');
const GPU = require('../models/Listing');

const router = express.Router();

// Middleware for JWT authentication
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Place a bid
router.post('/:gpuId', auth, async (req, res) => {
    const { gpuId } = req.params;
    const { amount } = req.body;

    try {
        const gpu = await GPU.findById(gpuId);
        if (!gpu) return res.status(404).json({ message: 'GPU not found' });

        const bid = new Bid({ gpu: gpuId, bidder: req.user.userId, amount });
        await bid.save();
        res.status(201).json(bid);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all bids for a GPU
router.get('/:gpuId', async (req, res) => {
    const { gpuId } = req.params;

    try {
        const bids = await Bid.find({ gpu: gpuId }).sort({ amount: -1 });
        res.json(bids);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
