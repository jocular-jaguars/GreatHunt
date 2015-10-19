var Challenge = require('./challengeModel.js');
var mongoose = require('mongoose');

var createChallenge = function(challenge, callback) {
  var challenge = new Challenge(challenge);
  challenge.save(function(err) {
    if(err) console.log("oh no, error: ", err);
    callback(challenge);
  })
};

var findChallenge = function(challengeID, callback) {
  Challenge.findOne({_id: challengeID}, function(err, challenge) {
    if(err) console.log("There was an error finding your challenge: ", err);
    callback(challenge);
  })
};

var allChallenges = function(callback) {
  Challenge.find({}, function(err, challenges) {
    if(err) console.log("There was an error retriveing the hunts: ", err);
    callback(challenges);
  });
};

module.exports.createChallenge = createChallenge;
module.exports.findChallenge = findChallenge;
module.exports.allChallenges = allChallenges;
