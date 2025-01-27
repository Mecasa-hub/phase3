const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const router = express.Router();

// Test user credentials
const TEST_USER = {
  email: 'test@example.com',
  password: 'password123'
};

router.post('/register', (req, res) => {
  res.status(201).json({ message: 'Registration is disabled in test mode' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === TEST_USER.email && password === TEST_USER.password) {
    const token = jwt.sign({ userId: '123' }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
