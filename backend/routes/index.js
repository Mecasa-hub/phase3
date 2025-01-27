const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const workflowRoutes = require('./workflows');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AI Workflow Automation API' });
});

router.use('/auth', authRoutes);
router.use('/workflows', workflowRoutes);

module.exports = router;
