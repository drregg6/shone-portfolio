/*

Portfolio = [
  {
    title: Toys R Us,
    portfolioItems: [
      {
        title: Gameboy,
        image: http://www.placehold.it/50x50,
        desc: Designed the cover
        date: March 2013,
        company: Toys R Us
      },
      {
        title: Polly Pocket,
        image: http://www.placehold.it/50x50,
        desc: Designed the cover
        date: March 2013,
        company: Toys R Us
      },
      {
        title: Atari,
        image: http://www.placehold.it/50x50,
        desc: Designed the cover
        date: March 2013,
        company: Toys R Us
      }
    ]
  },
  {
    title: Bristol Myers
  }
]

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const portfolioItemSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   desc: {
//     type: String
//   },
//   date: {
//     type: Date,
//     default: Date.now()
//   },
//   company: {
//     type: String
//   },
//   image: {
//     type: String
//   }
// })

const portfolioSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  splash: {
    type: String,
    default: 'http://www.placehold.it/400x175'
  },
  portfolioItems: [
    {
      title: {
        type: String
      },
      desc: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      },
      company: {
        type: String
      },
      image: {
        type: String
      }
    }
  ]
});

module.exports = Portfolio = mongoose.model('Portfolio', portfolioSchema);