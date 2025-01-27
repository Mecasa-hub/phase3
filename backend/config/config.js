require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5001,
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-workflow-automation',
};
