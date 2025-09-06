const mongoose = require('mongoose');
require('dotenv').config();
const Item = require('./models/item');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecom2';
mongoose.connect(MONGO, { useNewUrlParser:true, useUnifiedTopology:true }).then(async ()=>{
  await Item.deleteMany({});
  await Item.insertMany([
    { name: 'Paracetamol 500', description:'Pain relief', price: 30, category: 'pain', stock: 100, imageUrl: '' },
    { name: 'Aspirin 75', description:'Cardio', price: 80, category: 'cardio', stock: 50, imageUrl: '' },
    { name: 'Vitamin C 500', description:'Supplement', price: 120, category: 'supplement', stock: 80, imageUrl: '' },
    { name: 'Cough Syrup', description:'Cold & cough', price: 150, category: 'cold', stock: 40, imageUrl: '' }
  ]);
  console.log('Seed done'); process.exit();
}).catch(err => { console.error(err); process.exit(1); });
