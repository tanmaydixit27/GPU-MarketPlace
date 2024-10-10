import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { deleteGPU } from '../services/api';
import EditListing from './EditListing';

const GPUListing = ({ listing, refreshListings }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteGPU(listing._id);
      refreshListings(); // Call refreshListings after deletion
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const handleEditComplete = () => {
    setIsEditing(false); // Exit edit mode after editing
    refreshListings(); // Refresh the listings after edit completion
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <EditListing listingId={listing._id} refreshListings={refreshListings} onEditComplete={handleEditComplete} />
        ) : (
          <>
            <Typography variant="h6" gutterBottom>{listing.name}</Typography>
            <Typography>Price: ${listing.price}</Typography>
            <Typography>Highest Bid: ${listing.highestBid || 'No bids yet'}</Typography>
            <Box mt={2}>
              <Button component={Link} to={`/listings/${listing._id}`} variant="contained" color="primary" fullWidth>
                View Details
              </Button>
              <Button onClick={() => setIsEditing(true)} variant="contained" color="secondary" fullWidth sx={{ mt: 1 }}>
                Edit
              </Button>
              <Button onClick={handleDelete} variant="contained" color="error" fullWidth sx={{ mt: 1 }}>
                Delete
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GPUListing;
