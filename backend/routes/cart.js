const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

// get cart for logged-in user
router.get('/', auth, async (req,res)=>{
  const c = await Cart.findOne({ user: req.userId }).populate('items.item');
  if(!c) return res.json({ items: [] });
  res.json(c);
});

// add item
router.post('/add', auth, async (req,res)=>{
  const { itemId, qty = 1 } = req.body;
  let c = await Cart.findOne({ user: req.userId });
  if(!c) c = new Cart({ user: req.userId, items: [] });
  const idx = c.items.findIndex(i => i.item.toString() === itemId);
  if(idx > -1) c.items[idx].qty += Number(qty);
  else c.items.push({ item: itemId, qty: Number(qty) });
  await c.save();
  await c.populate('items.item');
  res.json(c);
});

// remove item
router.post('/remove', auth, async (req,res)=>{
  const { itemId } = req.body;
  let c = await Cart.findOne({ user: req.userId });
  if(!c) return res.json({ items: [] });
  c.items = c.items.filter(i => i.item.toString() !== itemId);
  await c.save();
  await c.populate('items.item');
  res.json(c);
});

// update quantity
router.post('/update', auth, async (req,res)=>{
  const { itemId, qty } = req.body;
  let c = await Cart.findOne({ user: req.userId });
  if(!c) return res.json({ items: [] });
  const it = c.items.find(i => i.item.toString() === itemId);
  if(it) it.qty = Number(qty);
  await c.save();
  await c.populate('items.item');
  res.json(c);
});

// merge guest cart into user cart on login
// body: { items: [{ itemId, qty }, ...] }
router.post('/merge', auth, async (req,res)=>{
  const guestItems = req.body.items || [];
  let c = await Cart.findOne({ user: req.userId });
  if(!c) c = new Cart({ user: req.userId, items: [] });
  for(const g of guestItems){
    const idx = c.items.findIndex(i => i.item.toString() === g.itemId);
    if(idx > -1) c.items[idx].qty += Number(g.qty);
    else c.items.push({ item: g.itemId, qty: Number(g.qty) });
  }
  await c.save();
  await c.populate('items.item');
  res.json(c);
});

module.exports = router;
