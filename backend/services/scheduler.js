const cron = require('node-cron');
const Workflow = require('../models/Workflow');
const Execution = require('../models/Execution');
const workflowExecutor = require('./workflowExecutor');

class Scheduler {
  constructor() {
    this.jobs = new Map();
  }

  async initializeJobs() {
    const workflows = await Workflow.find({ 'schedule.enabled': true });
    for (const workflow of workflows) {
      this.scheduleWorkflow(workflow);
    }
  }

  scheduleWorkflow(workflow) {
    if (this.jobs.has(workflow._id.toString())) {
      this.jobs.get(workflow._id.toString()).stop();
    }

    const job = cron.schedule(workflow.schedule.cronExpression, async () => {
      await this.executeWorkflow(workflow);
    });

    this.jobs.set(workflow._id.toString(), job);
  }

  async executeWorkflow(workflow) {
    try {
      const startTime = new Date();
      const { results, success, error } = await workflowExecutor.executeWorkflow(workflow);
      const completedTime = new Date();

      const execution = new Execution({
        workflow: workflow._id,
        user: workflow.user,
        status: success ? 'success' : 'failed',
        results: Object.entries(results).map(([nodeId, result]) => ({
          nodeId,
          nodeType: workflow.nodes.find(n => n.id === nodeId)?.type,
          result
        })),
        startedAt: startTime,
        completedAt: completedTime
      });
      await execution.save();

      // Update lastRun and nextRun
      workflow.schedule.lastRun = startTime;
      workflow.schedule.nextRun = cron.schedule(workflow.schedule.cronExpression).nextDate().toDate();
      await workflow.save();

      if (!success) {
        console.error(`Scheduled workflow ${workflow._id} failed:`, error);
      }
    } catch (error) {
      console.error(`Error executing scheduled workflow ${workflow._id}:`, error);
      
      const execution = new Execution({
        workflow: workflow._id,
        user: workflow.user,
        status: 'failed',
        results: [],
        startedAt: new Date(),
        completedAt: new Date(),
      });
      await execution.save();
    }
  }

  updateWorkflowSchedule(workflow) {
    if (workflow.schedule.enabled) {
      this.scheduleWorkflow(workflow);
    } else {
      const job = this.jobs.get(workflow._id.toString());
      if (job) {
        job.stop();
        this.jobs.delete(workflow._id.toString());
      }
    }
  }
}

module.exports = new Scheduler();
