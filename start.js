const { spawn } = require('node:child_process');
const path = require('node:path');

const backend = spawn('node', [path.join(__dirname, 'backend', 'src', 'server.js')], { stdio: 'inherit' });

process.on('exit', () => {
  backend.kill();
});

console.log('Backend server started. Please start the frontend server manually.');
