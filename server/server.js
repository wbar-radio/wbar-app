const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001; // Choose any available port

// Middleware
app.use(cors());
app.use(express.json());

// Sample API route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
