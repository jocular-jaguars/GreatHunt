var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var huntSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  //challenges are an array of the database "challenge"
  challenges: {
    type: [challenge],
    required: true
  },
  creator: {
    type: String
  },
  private: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose('hunts', huntSchema);
