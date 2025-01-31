const mongoose = require('mongoose');

const ExecutionSchema = new mongoose.Schema({
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    required: true,
  },
  results: [{
    nodeId: {
      type: String,
      required: true
    },
    nodeType: String,
    result: {
      success: {
        type: Boolean,
        required: true
      },
      data: mongoose.Schema.Types.Mixed,
      error: String
    }
  }],
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  duration: {
    type: Number,
    get: function() {
      if (this.completedAt && this.startedAt) {
        return this.completedAt - this.startedAt;
      }
      return null;
    }
  },
  executedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Execution', ExecutionSchema);
