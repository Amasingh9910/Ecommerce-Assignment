const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req,res)=>{
  try{
    const { name, email, password } = req.body;
    if(!email || !password) return res.status(400).json({ msg: 'Email/password required' });
    if(await User.findOne({ email })) return res.status(400).json({ msg: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const u = await new User({ name, email, password: hash }).save();
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'verysecret_jwt_key_change_this', { expiresIn: '7d' });
    res.json({ token, user: { id: u._id, name: u.name, email: u.email } });
  } catch(e) { console.error(e); res.status(500).json({ msg: 'Server error' }); }
});

router.post('/login', async (req,res)=>{
  try{
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if(!u) return res.status(400).json({ msg: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, u.password);
    if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'verysecret_jwt_key_change_this', { expiresIn: '7d' });
    res.json({ token, user: { id: u._id, name: u.name, email: u.email } });
  } catch(e){ console.error(e); res.status(500).json({ msg: 'Server error' }); }
});

module.exports = router;
