const http = require('http');

// Configuration object for the HTTP request
const options = {
  hostname: 'example.com',
  path: '/index.html',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js HTTP Client'
  }
};

// Make the HTTP request
const req = http.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);

  let data = '';

  // Collect data chunks
  res.on('data', (chunk) => {
    data += chunk;
  });

  // Process the complete response
  res.on('end', () => {
    console.log('Response Body:', data);
  });
});

// Handle errors
req.on('error', (error) => {
  console.error('Error:', error.message);
});

// End the request
req.end();

console.log('Making HTTP GET request to example.com...');
