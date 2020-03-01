const { check, validationResult } = require('express-validator');
const Portfolio = require('../../models/Portfolio');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// @route  GET /api/portfolios
// @desc   Get all portfolios
// @access Public
router.get('/', async (req, res) => {
  try {
    // This will be sent to populate a state arr
    let portfolios = await Portfolio.find();

    res.json(portfolios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route  GET /api/portfolios/:id
// @desc   Get user portfolios
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let userPortfolio = await Portfolio.findOne({ user: req.params.id });
    if (!userPortfolio) {
      return res.json({ msg: 'Portfolio not found' });
    }

    let portfolios = userPortfolio.portfolios;
    res.json(portfolios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route  GET /api/portfolios/portfolio/:id/
// @desc   Get a specific portfolio
// @access Private
router.get('/portfolio/:id/', auth, async (req, res) => {
  try {
    // Get user portfolios
    const userPortfolio = await Portfolio.findOne({ user: req.user.id });
    if (!userPortfolio) {
      return res.json({ msg: 'User portfolio is not found' });
    }
    const portfolio = userPortfolio.portfolios.filter(project => project.id === req.params.id)[0];
    console.log(portfolio);
    if (!portfolio) {
      return res.json({ msg: 'Portfolio could not be found' });
    }
    res.json({ portfolio });
  } catch (err) {
    console.error(err);
  }
});

// @route  POST /api/portfolios
// @desc   Create or update portfolio
// @access Private
router.post('/', [auth, [
  check('title', 'Title is required')
  .not()
  .isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });

  const {
    title,
    desc,
    date,
    image,
    company
  } = req.body;

  const newPortfolio = {};
  if (title) newPortfolio.title = title;
  if (desc) newPortfolio.desc = desc;
  if (date) newPortfolio.date = date;
  if (image) newPortfolio.image = image;
  if (company) newPortfolio.company = company;
  if (_id) newPortfolio._id = mongoose.Types.ObjectId(_id);

  // If the user's portfolio does not exist yet
  try {
    let userPortfolio = await Portfolio.findOne({ user: req.user.id });
    if (!userPortfolio) {
      userPortfolio = new Portfolio({
        user: req.user.id,
        portfolios: []
      });
      userPortfolio.portfolios.unshift(newPortfolio);
      await userPortfolio.save();
      return res.json(userPortfolio.portfolios);
    }

    // If the portfolio is being updated
    let portfolio = userPortfolio.portfolios.filter(project => project._id.toString() === _id)[0];
    if (portfolio) {
      let index = userPortfolio.portfolios.map(project => project._id).indexOf(newPortfolio._id);
      
      userPortfolio.portfolios.splice(index, 1, newPortfolio);
      await userPortfolio.save();
      return res.json(userPortfolio.portfolios);
    }

    // Update userPortfolio portfolios arr with newPortfolio
    userPortfolio.portfolios.unshift(newPortfolio);
    await userPortfolio.save();
    res.json(userPortfolio.portfolios)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route  DELETE /api/portfolios/:id
// @desc   Delete a portfolio
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let userPortfolio = await Portfolio.findOne({ user: req.user.id });
    if (!userPortfolio) {
      return res.status(400).json({ msg: 'User cannot be found' });
    }
    let index = userPortfolio.portfolios.map(project => mongoose.Types.ObjectId(project.id)).indexOf(req.params.id);

    userPortfolio.portfolios.splice(index, 1);
    await userPortfolio.save();
    res.json({ msg: 'Portfolio deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;