const mongoose = require('mongoose');

const RatingsSchema = mongoose.Schema({
  user: {
    type: String
  },
  rating: {
    type: String
  },
  movieID: {
    type: String
  }
});

module.exports = mongoose.model('ratings', RatingsSchema);
