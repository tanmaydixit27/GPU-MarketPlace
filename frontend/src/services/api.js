import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend base URL

// User Authentication Functions

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    localStorage.setItem('token', response.data.token)
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Register user
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// GPU Listings CRUD Functions

// Fetch all listings (public)
export const getListings = async () => {
  try {
    const response = await axios.get(`${API_URL}/gpus`);
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch a single listing by ID
export const getListingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/gpus/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
};
export const getListing = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/gpus/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching listing:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Place a bid on a listing
export const placeBid = async (id, bidData) => {
  try {
    const response = await axios.post(`${API_URL}/gpus/${id}/bid`, bidData);
    return response.data;
  } catch (error) {
    console.error('Error placing bid:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch user's own listings (private)
export const getMyListings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/gpus/mine`, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user listings:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Create a new listing (private)
export const createListing = async (listingData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/gpus/mine`, listingData, {
      headers: { 'x-auth-token': token },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating listing:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update an existing listing by ID (private)
export const updateListing = async (id, updatedData, token) => {
  try {
      const response = await axios.put(
          `${API_URL}/gpus/${id}`, // Corrected the URL
          updatedData,
          {
              headers: {
                  'Authorization': `Bearer ${token}`,  // Include token in the headers
                  'Content-Type': 'application/json'
              }
          }
      );
      return response.data;
  } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
  }
};







// Delete a listing by ID (private)
export const deleteGPU = async (id) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token, authorization denied');
    }

    // Set headers
    const config = {
      headers: {
        'x-auth-token': token, // Add token to the request header
      },
    };

    // Make DELETE request
    await axios.delete(`${API_URL}/gpus/${id}`, config);

    console.log('Listing deleted successfully');
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};