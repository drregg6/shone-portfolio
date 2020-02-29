const express = require('express');
const router = express.Router();

// @route  /users
// @desc   GET user
// @access PUBLIC
router.get('/', (req, res) => {
  res.send('Get all users');
});

module.exports = router;