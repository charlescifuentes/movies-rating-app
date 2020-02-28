const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
  user: {
    type: String
  },
  comment: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('comments', CommentsSchema);
