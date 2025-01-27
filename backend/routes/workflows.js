const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');
const Execution = require('../models/Execution');
const authMiddleware = require('../middleware/auth');
const actionExecutor = require('../utils/actionExecutor');
const scheduler = require('../services/scheduler');

// Create a new workflow
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, steps, schedule } = req.body;
    const workflow = new Workflow({
      name,
      steps,
      user: req.user.userId,
      schedule,
    });
    await workflow.save();

    if (schedule?.enabled) {
      scheduler.scheduleWorkflow(workflow);
    }

    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ message: 'Error creating workflow', error: error.message });
  }
});

// Update a workflow
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, steps, schedule } = req.body;
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { name, steps, schedule },
      { new: true }
    );

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    scheduler.updateWorkflowSchedule(workflow);

    res.json(workflow);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workflow', error: error.message });
  }
});

// Execute a workflow
router.post('/:id/execute', authMiddleware, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({ _id: req.params.id, user: req.user.userId });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    const results = [];
    let status = 'success';
    for (const step of workflow.steps) {
      try {
        const result = await actionExecutor.execute(step.action, JSON.parse(step.params));
        results.push({ description: step.description, result });
      } catch (stepError) {
        results.push({ description: step.description, error: stepError.message });
        status = 'failed';
      }
    }

    const execution = new Execution({
      workflow: workflow._id,
      user: req.user.userId,
      status,
      results,
    });
    await execution.save();

    res.json({ message: 'Workflow executed successfully', results, executionId: execution._id });
  } catch (error) {
    res.status(500).json({ message: 'Error executing workflow', error: error.message });
  }
});

// Get workflow statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalWorkflows = await Workflow.countDocuments({ user: req.user.userId });
    const activeWorkflows = await Workflow.countDocuments({ user: req.user.userId, 'schedule.enabled': true });
    const totalExecutions = await Execution.countDocuments({ user: req.user.userId });
    const successfulExecutions = await Execution.countDocuments({ user: req.user.userId, status: 'success' });

    res.json({
      totalWorkflows,
      activeWorkflows,
      totalExecutions,
      successfulExecutions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflow statistics', error: error.message });
  }
});

// Get recent executions
router.get('/recent-executions', authMiddleware, async (req, res) => {
  try {
    const recentExecutions = await Execution.find({ user: req.user.userId })
      .sort({ executedAt: -1 })
      .limit(10)
      .populate('workflow', 'name');

    const formattedExecutions = recentExecutions.map(execution => ({
      id: execution._id,
      workflowName: execution.workflow.name,
      status: execution.status,
      executedAt: execution.executedAt,
    }));

    res.json(formattedExecutions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent executions', error: error.message });
  }
});

module.exports = router;
