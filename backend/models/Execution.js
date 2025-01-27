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
    description: String,
    result: mongoose.Schema.Types.Mixed,
    error: String,
  }],
  executedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Execution', ExecutionSchema);
