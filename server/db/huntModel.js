var mongoose = require('mongoose');
var Challenge = require('./challengeModel.js');
var User = require('./userModel.js');
var Schema = mongoose.Schema;

var huntSchema = new Schema({
  name: {
    type: String,
    unique: true,
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
  challenges: [{
    type: Schema.Types.ObjectId, ref: 'Challenge'
  }],
  //a user must be signed in to create a hunt
  creator: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  private: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Hunt', huntSchema);
