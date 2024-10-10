const mongoose = require('mongoose');
const Listing = require('../models/Listing'); // Adjust according to your models

// Create a new listing
exports.createListing = async (req, res) => {
  try {
    const { name, price, highestBid } = req.body;
    const newListing = new Listing({
      name,
      price,
      highestBid,
      user: req.user.id, // Associate the listing with the user
    });
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all listings
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's own listings
exports.getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.user.id });
    res.json(listings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a listing

exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Trim whitespace and newlines from the ID
    const trimmedId = id.trim();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const listing = await Listing.findById(trimmedId);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    if (listing.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized to update this listing' });
    }

    // Validate incoming data
    const updatedData = {};
    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.price) updatedData.price = req.body.price;
    if (req.body.description) updatedData.description = req.body.description; // Include description

    // Update the listing
    const updatedListing = await Listing.findByIdAndUpdate(trimmedId, updatedData, { new: true, runValidators: true });
    if (!updatedListing) {
      return res.status(404).json({ message: 'Failed to update listing' });
    }

    res.json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error); // Log error details
    res.status(500).json({ message: 'Server error', error: error.message }); // Send back the error message
  }
};
// listingController.js
exports.getListingById = async (req, res) => {
  const { id } = req.params;

  console.log('Received ID:', id); // Log the received ID

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete a listing
exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    if (listing.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized to delete this listing' });
    }

    await Listing.findByIdAndDelete(id);
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};