const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('node:path');
const config = require('../config/config');
const authRoutes = require('../routes/auth');
const authMiddleware = require('../middleware/auth');
const scheduler = require('../services/scheduler');

const app = express();

// Skip MongoDB connection for testing
console.log('Running in test mode without MongoDB');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend to access the API
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workflows', require('../routes/workflows'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
