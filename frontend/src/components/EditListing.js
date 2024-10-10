import React, { useState, useEffect } from 'react';
import { getListingById, updateListing } from '../services/api';
import { TextField, Button, Box } from '@mui/material';
import PropTypes from 'prop-types'; // Import prop-types for prop validation

const EditListing = ({ listingId, refreshListings, onEditComplete }) => {
    const [listingData, setListingData] = useState({ name: '', price: '' });

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await getListingById(listingId);
                setListingData(data);
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        };

        fetchListing();
    }, [listingId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token'); // Retrieve the token
        if (!token) {
            console.error('No token, authorization denied');
            return; // Prevent further execution if there's no token
        }

        try {
            await updateListing(listingId, listingData, token);
            refreshListings(); // Call to refresh listings
            onEditComplete(); // Call this to exit edit mode
        } catch (error) {
            console.error('Error updating listing:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="GPU Name"
                value={listingData.name}
                onChange={(e) => setListingData({ ...listingData, name: e.target.value })}
                fullWidth
                required
            />
            <TextField
                label="Price"
                type="number"
                value={listingData.price}
                onChange={(e) => setListingData({ ...listingData, price: e.target.value })}
                fullWidth
                required
                sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Update GPU Listing
            </Button>
        </Box>
    );
};

// Prop validation
EditListing.propTypes = {
    listingId: PropTypes.string.isRequired,
    refreshListings: PropTypes.func.isRequired, // Validate that it's a function
    onEditComplete: PropTypes.func.isRequired,
};

export default EditListing;
