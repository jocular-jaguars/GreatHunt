var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var challengeSchema = new Schema({
  pictureURL: {
    type: String,
    required: true
  },
  description: String,
  question: {
    type: String,
    required: true
  },
  answers: {
    type: [String],
    required: true
  }
});

module.exports = mongoose('challenges', challengeSchema);
