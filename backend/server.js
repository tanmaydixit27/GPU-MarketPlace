require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/gpu'); // Add this line
const gpuRoutes = require('./routes/gpu');

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); 
// Routes
app.use('/api', gpuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gpus', listingRoutes); // Ensure this matches your route structure

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
