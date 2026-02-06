require('dotenv').config();

const connectDB = require('./src/config/db');
const app = require('./app');
const port = process.env.PORT || 5000;
const cors = require('cors');

// Connect to database
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
