const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('node:path');
const fs = require('node:fs');
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Routes with error handling
app.use('/api/auth', (req, res, next) => {
  try {
    authRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/api/workflows', (req, res, next) => {
  try {
    require('../routes/workflows')(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Only serve static files if frontend build exists
const frontendBuildPath = path.join(__dirname, '../../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  
  // Catch-all route to serve the frontend
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
