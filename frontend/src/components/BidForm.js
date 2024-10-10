import React, { useState } from 'react';
import { placeBid } from '../services/api';
import { TextField, Button, Box } from '@mui/material';

const BidForm = ({ listingId, refreshListing }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await placeBid(listingId, { bid: bidAmount });
    refreshListing();
    setBidAmount('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Enter your bid"
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Place Bid
      </Button>
    </Box>
  );
};

export default BidForm;
