const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// MIDDLEWARE
const auth = require('../middleware/auth');

// MODELS
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }

});

// @route   POST api/auth
// @desc    Authorize user + get token
// @access  Public
router.post(
  
  '/', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],

  async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

      let user = await User.findOne({ email });
      // CHECK IF USER EXISTS
      if(!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // CHECK IF PASSWORD MATCHES
      if(!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // IF BOTH CONDITIONS ARE TRUE
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );
      

    } catch (err) {

      console.error(err.message);
      res.stats(500).send('Server Error');

    }

  // res.send('Log in user');

});

module.exports = router;