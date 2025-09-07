require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const cartRoutes = require('./routes/cart');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecom2';

mongoose.connect(MONGO)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo connect error', err));

// Default route to check backend status
app.get('/', (req, res) => {
  res.send('Backend is running fine!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
