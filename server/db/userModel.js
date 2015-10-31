var mongoose = require('mongoose');
var Hunt = require('./huntModel.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePictureURL: {
    type: String
  },
  hunts: [{
    type: Schema.Types.ObjectId, ref: 'Hunt'
  }]
});

module.exports = mongoose.model('Hunt', huntSchema);
