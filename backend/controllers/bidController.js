const Listing = require('../models/GPU');
const Bid = require('../models/Bid');

// Place Bid
exports.placeBid = async (req, res) => {
  const { listingId } = req.params;
  const { amount } = req.body;

  try {
    const listing = await Listing.findById(listingId);
    if (amount <= listing.highestBid) {
      return res.status(400).json({ message: 'Bid must be higher than the current highest bid.' });
    }

    const newBid = await Bid.create({ amount, user: req.user.id, listing: listingId });
    listing.highestBid = amount;
    listing.bids.push(newBid._id);
    await listing.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
