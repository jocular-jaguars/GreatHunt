var Challenge = require('./challengeModel.js');
var mongoose = require('mongoose');

var createChallenge = function(challenge, callback) {
  var challenge = new Challenge(challenge);
  challenge.save(function(err) {
    if(err) console.log("oh no, error: ", err);
    callback(challenge);
  })
};

var findChallenge = function(challengeID) {
  Challenge.findOne({_id: challengeID}, function(err, challenge) {
    if(err) console.log("There was an error finding your challenge: ", err);
    callback(challenge);
  })
};

module.exports.createChallenge = createChallenge;
module.exports.findChallenge = findChallenge;
