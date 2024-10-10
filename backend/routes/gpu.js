// gpu.js (gpuroutes)
const express = require('express');
const auth = require('../middleware/authMiddleware'); // Import your JWT middleware
const GPU = require('../models/Listing'); // Adjust the path as necessary
const listingController = require('../controllers/listingController');

const router = express.Router();

// Get a specific GPU listing by ID
router.get('/gpus/:id', listingController.getListingById);

// Create GPU listing
router.post('/mine', auth, async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const gpu = new GPU({ name, description, price, owner: req.user.userId });
        await gpu.save();
        res.status(201).json(gpu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all GPUs
router.get('/', async (req, res) => {
    try {
        const gpus = await GPU.find();
        res.json(gpus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's own GPUs
router.get('/mine', auth, async (req, res) => {
    try {
        const userId = req.user.userId; // Use the user ID from the decoded token
        const userGPUs = await GPU.find({ owner: userId }); // Adjust this based on your schema
        res.json(userGPUs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update GPU
router.put('/:id', auth, async (req, res) => {
    try {
        const gpu = await GPU.findById(req.params.id);
        if (!gpu) return res.status(404).json({ message: 'GPU not found' });
        if (gpu.owner.toString() !== req.user.userId) return res.status(401).json({ message: 'Unauthorized' });

        const { name, description, price } = req.body;
        gpu.name = name;          // Update the name
        gpu.description = description; // Update the description
        gpu.price = price;        // Update the price
        await gpu.save();        // Save the updated GPU
        res.json(gpu);          // Return the updated GPU
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
});

// Delete GPU
router.delete('/:id', auth, async (req, res) => {
    try {
        const gpu = await GPU.findById(req.params.id);
        if (!gpu) return res.status(404).json({ message: 'GPU not found' });
        if (gpu.owner.toString() !== req.user.userId) return res.status(401).json({ message: 'Unauthorized' });

        await gpu.remove();      // Remove the GPU from the database
        res.status(200).json({ message: 'GPU deleted successfully' }); // Confirm deletion
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
});

module.exports = router;
