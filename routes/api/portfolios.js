const { check, validationResult } = require('express-validator');
const Portfolio = require('../../models/Portfolio');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();

// @route  GET /api/portfolios
// @desc   Get all portfolios
// @access Public
router.get('/', async (req, res) => {
  try {
    let portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route  GET /api/portfolios/:id
// @desc   Get a portfolio
// @access Public
router.get('/:id', async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.json({ msg: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})

// @route  POST /api/portfolios
// @desc   Create portfolio
// @access Private
router.post('/', [auth, [
  check('title', 'Title is required')
  .not()
  .isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(422).json({ errors: errors.array() });

  const { title, splash } = req.body;
  const newPortfolio = { title, splash };
  try {
    let portfolio = await Portfolio.findOne({ title: newPortfolio.title });
    if (portfolio) return res.status(400).json({ msg: 'Portfolio already exists' });

    portfolio = new Portfolio(newPortfolio);
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route  DELETE /api/portfolios/:id
// @desc   Delete a portfolio
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(400).json({ msg: 'Portfolio not found' });

    await portfolio.remove();
    res.json({ msg: 'Portfolio deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route  GET /api/portfolios/:id/items/:item_id
// @desc   Get a portfolio item
// @access Public
router.get('/:id/items/:item_id', async (req, res) => {
  try {
    let portfolios = await Portfolio.findById(req.params.id);
    if (!portfolios) return res.status(400).json({ msg: 'Portfolio not found' });

    let portfolioItem = portfolios.portfolioItems.find(item => item.id === req.params.item_id);
    if (!portfolioItem) return res.status(400).json({ msg: 'Portfolio item not found' });

    res.json(portfolioItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route  POST /api/portfolios/:id/items
// @desc   Update portfolio with new port item
// @access Private
router.post('/:id/items', auth, async (req, res) => {
  const {
    id,
    title,
    desc,
    date,
    company,
    image
  } = req.body;

  const newPortfolioItem = {};
  if (id) newPortfolioItem.id = id;
  if (title) newPortfolioItem.title = title;
  if (desc) newPortfolioItem.desc = desc;
  if (date) newPortfolioItem.date = date;
  if (company) newPortfolioItem.company = company;
  if (image) newPortfolioItem.image = image;

  try {
    // Find the portfolio
    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    if (!portfolio) return res.status(400).json({ msg: 'Portfolio not found' });

    let portfolioItem = portfolio.portfolioItems.find(item => item._id.toString() === newPortfolioItem.id);
    if (portfolioItem) {
      console.log('Lets update');
      portfolio = await Portfolio.findOneAndUpdate(
        { _id: req.params.id, 'portfolioItems._id': newPortfolioItem.id },
        { $set: { 'portfolioItems.$': newPortfolioItem } },
        { new: true }
      );
      return res.json(portfolio)
    };

    portfolio.portfolioItems.push(newPortfolioItem);
    await portfolio.save();
    res.json(portfolio)
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route  DELETE /api/portfolios/:portfolio_id/items/:item_id
// @desc   Delete a portfolioItem
// @access Private
router.delete('/:portfolio_id/items/:item_id', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ _id: req.params.portfolio_id });
    if (!portfolio) return res.status(400).json({ msg: 'Portfolio does not exist' });

    const removeIndex = portfolio.portfolioItems.map(item => item.id).indexOf(req.params.item_id);
    portfolio.portfolioItems.splice(removeIndex, 1);

    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;