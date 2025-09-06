const mongoose = require('mongoose');
const s = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    qty: { type: Number, default: 1 }
  }]
});
module.exports = mongoose.model('Cart', s);
