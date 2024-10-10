import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AddNewListing = ({ refreshListings }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [highestBid, setHighestBid] = useState('');
    const [description, setDescription] = useState(''); // New state for description

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const listingData = {
            name,
            price: parseFloat(price),
            highestBid: highestBid ? parseFloat(highestBid) : null,
            description, // Include description in the request
        };

        try {
            await axios.post('http://localhost:5000/api/gpus/mine', listingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            refreshListings();
            setName('');
            setPrice('');
            setHighestBid('');
            setDescription(''); // Clear the description input
        } catch (error) {
            console.error('Error creating listing:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add New Listing</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <TextField
                label="Highest Bid"
                type="number"
                value={highestBid}
                onChange={(e) => setHighestBid(e.target.value)}
            />
            <TextField
                label="Description" // New description input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required // You can choose to make this optional
            />
            <Button type="submit" variant="contained">Add Listing</Button>
        </form>
    );
};

export default AddNewListing;
