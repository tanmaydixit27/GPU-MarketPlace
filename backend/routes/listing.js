const express = require('express');
const { 
  createListing, 
  getListings, 
  getMyListings, 
  updateListing, 
  deleteListing 
} = require('../controllers/listingController');
const { getListingById } = require('../controllers/listingController');

const auth = require('../middleware/authMiddleware'); // Import your auth middleware

const router = express.Router();

console.log('createListing:', createListing); // Check if this logs a function
console.log('getListings:', getListings); // Check if this logs a function

// POST route for creating a new listing
router.post('/mine', auth, createListing);

// GET route for fetching all listings
router.get('/', getListings); // Adjust according to your controller

// GET route for fetching user's own listings
router.get('/mine', auth, getMyListings);

// PUT route for updating a listing
router.put('/mine/:id', auth, updateListing);
router.get('/gpus/:id', listingController.getListingById);

router.get('/gpus/:id', getListingById);
// DELETE route for deleting a listing
router.delete('/mine/:id', auth, deleteListing);

module.exports = router;
