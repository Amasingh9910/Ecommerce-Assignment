// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());
app.use(cors()); // local development - allow all

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecom2';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('Mongo connected'))
  .catch(err=>console.error('Mongo connect error', err));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
