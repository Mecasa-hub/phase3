const express = require('express');
const router = express.Router();

// Test mode routes without MongoDB
router.get('/', (req, res) => {
  res.json({
    message: 'Backend is running properly',
    status: 'OK',
    testMode: true,
    timestamp: new Date().toISOString()
  });
});

// Mock workflow creation for testing
router.post('/', (req, res) => {
  const workflow = {
    id: `test-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(workflow);
});

// Mock workflow execution for testing
router.post('/:id/execute', (req, res) => {
  res.json({
    message: 'Test workflow executed successfully',
    workflowId: req.params.id,
    executionId: `test-execution-${Date.now()}`,
    results: {
      success: true,
      timestamp: new Date().toISOString()
    }
  });
});

// Mock workflow statistics for testing
router.get('/stats', (req, res) => {
  res.json({
    totalWorkflows: 5,
    activeWorkflows: 2,
    totalExecutions: 100,
    successfulExecutions: 95,
    testMode: true
  });
});

// Mock recent executions for testing
router.get('/recent-executions', (req, res) => {
  const mockExecutions = Array.from({ length: 5 }, (_, i) => ({
    id: `test-execution-${i}`,
    workflowName: `Test Workflow ${i + 1}`,
    status: i < 4 ? 'success' : 'failed',
    executedAt: new Date(Date.now() - i * 3600000).toISOString()
  }));
  res.json(mockExecutions);
});

module.exports = router;
