const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {

// GET TOKEN FROM HEADER
// 'x-auth-token' == key in header object
  const token = req.header('x-auth-token');

// CHECK IF NOT TOKEN
  if(!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied.' });
  }

// VERIFY TOKEN
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();

// VERIFICATION FAILED

  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }


}