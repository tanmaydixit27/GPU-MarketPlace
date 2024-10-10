// Dashboard.js
import React, { useEffect, useState } from 'react';
import GPUListing from '../components/GPUListing';
import { getMyListings } from '../services/api';

const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const data = await getMyListings();
        setListings(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user listings:', err);
        setError('Failed to fetch user listings.');
        setLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  return (
    <div>
      <h2>My Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {listings.length === 0 && !loading && <p>No listings found.</p>}
      {listings.map(listing => (
        <GPUListing key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default Dashboard;
