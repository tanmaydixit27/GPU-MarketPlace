import React, { useEffect, useState } from 'react';
import GPUListing from '../components/GPUListing';
import { Typography, Box } from '@mui/material';
import { getListings } from '../services/api'; 
import AddNewListing from '../components/AddNewListing'; 

const Listings = () => {
  const [listings, setListings] = useState([]);

  // Function to fetch listings
  const fetchListings = async () => {
    try {
      const data = await getListings();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Available GPU Listings
      </Typography>
      <AddNewListing refreshListings={fetchListings} />
      {listings.map((listing) => (
        <GPUListing key={listing._id} listing={listing} refreshListings={fetchListings} /> 
      ))}
    </Box>
  );
};

export default Listings;
