const mongoose = require('mongoose');
const s = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  stock: Number
});
module.exports = mongoose.model('Item', s);
