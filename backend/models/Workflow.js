const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  position: {
    x: Number,
    y: Number
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  draggable: {
    type: Boolean,
    default: true
  },
  connectable: {
    type: Boolean,
    default: true
  }
});

const EdgeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'custom'
  },
  animated: {
    type: Boolean,
    default: true
  },
  style: {
    type: mongoose.Schema.Types.Mixed,
    default: { stroke: '#1976d2', strokeWidth: 1.5 }
  }
});

const CredentialsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const WorkflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  version: String,
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  credentials: [CredentialsSchema],
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
