const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
const port = 3000;

// Connect to database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
