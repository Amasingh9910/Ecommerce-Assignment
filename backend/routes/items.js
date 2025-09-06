const express = require('express');
const Item = require('../models/item');
const router = express.Router();

// create item (for quick testing; no auth)
router.post('/', async (req,res)=> {
  try { const it = await new Item(req.body).save(); res.json(it); }
  catch(e){ console.error(e); res.status(500).json({ msg:'err' }); }
});

// list with optional filters: ?category=&min=&max=&search=
router.get('/', async (req,res)=>{
  try{
    const { category, min, max, search } = req.query;
    const f = {};
    if(category) f.category = category;
    if(min || max) f.price = {};
    if(min) f.price.$gte = Number(min);
    if(max) f.price.$lte = Number(max);
    if(search) f.name = { $regex: search, $options: 'i' };
    const items = await Item.find(f).limit(100);
    res.json(items);
  }catch(e){ console.error(e); res.status(500).json({ msg:'err' }); }
});

router.get('/:id', async (req,res) => {
  try{ const it = await Item.findById(req.params.id); res.json(it); }
  catch(e){ console.error(e); res.status(500).json({ msg:'err' }); }
});

module.exports = router;
