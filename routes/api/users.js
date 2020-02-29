const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route  /users
// @desc   GET user
// @access PUBLIC
router.get('/', (req, res) => {
  res.send('Get all users');
});

// @route  /users
// @desc   POST user
// @access PUBLIC
router.post('/', [
  check('email', 'Please include valid email')
  .isEmail(),
  .check('password', 'Password is at least 6 characters long')
  .isLength({ min: 6 })
],async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ errors: [{ msg: 'User already exists!' }] })

    user = new User({ email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create json web token
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;