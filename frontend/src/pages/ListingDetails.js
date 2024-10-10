// ListingDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { getListing } from '../services/api';
import BidForm from '../components/BidForm';
import { Typography, Box } from '@mui/material';

const ListingDetails = () => {
  const [listing, setListing] = useState(null);
  const { id } = useParams(); // Use useParams to access the route parameter

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListing(id);
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>{listing.name}</Typography>
      <Typography>Price: ${listing.price}</Typography>
      <Typography>Highest Bid: ${listing.highestBid || 'No bids yet'}</Typography>
      <BidForm listingId={listing._id} refreshListing={() => setListing(listing)} />
    </Box>
  );
};

export default ListingDetails;
