const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
  const h = req.header('Authorization') || '';
  const token = h.split(' ')[1];
  if(!token) return res.status(401).json({ msg: 'No token' });
  try{
    const dec = jwt.verify(token, process.env.JWT_SECRET || 'verysecret_jwt_key_change_this');
    req.userId = dec.id;
    next();
  } catch(e){
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
