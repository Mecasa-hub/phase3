const cron = require('node-cron');
const Workflow = require('../models/Workflow');
const Execution = require('../models/Execution');
const actionExecutor = require('../utils/actionExecutor');

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
      user: workflow.user,
      status,
      results,
    });
    await execution.save();

    // Update lastRun and nextRun
    workflow.schedule.lastRun = new Date();
    workflow.schedule.nextRun = cron.schedule(workflow.schedule.cronExpression).nextDate().toDate();
    await workflow.save();
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
