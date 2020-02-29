const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const portfolioItemSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String
  },
  date: {
    type: DateTime,
    default: Date.now()
  },
  company: {
    type: String
  },
  image: {
    type: String
  }
})

const portfolioSchema = new Schema({
  portfolio: [portfolioItemSchema]
});

module.exports = Portfolio = mongoose.model('Portfolio', portfolioSchema);