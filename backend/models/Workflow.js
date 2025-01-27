const mongoose = require('mongoose');

const WorkflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  steps: [{
    description: String,
    action: String,
    params: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schedule: {
    enabled: {
      type: Boolean,
      default: false,
    },
    cronExpression: {
      type: String,
      validate: {
        validator: (v) => {
          // Basic cron expression validation
          return /^(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)$/.test(v);
        },
        message: props => `${props.value} is not a valid cron expression!`
      },
    },
    lastRun: Date,
    nextRun: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model('Workflow', WorkflowSchema);
