var Hunt = require('./huntModel.js');
//var ObjectId = require('mongoose').Types.ObjectId;

var createHunt = function(hunt, callback) {
  var hunt = new Hunt(hunt);
  hunt.save(function(err) {
    if(err) console.log("There was an error adding the hunt: ", err);
    callback(err, hunt);
  })
};

var findHunt = function(huntName, callback) {
  Hunt.findOne({name: huntName})
    .exec(callback);
};

var allHunts = function(callback) {
  Hunt.find({})
    .exec(callback);
};

//returns hunt name, location, and description for hunts list
var allHuntsClient = function(callback) {
  Hunt.find({})
    .select('name location description')
    .exec(callback);
}

module.exports.createHunt = createHunt;
module.exports.findHunt = findHunt;
module.exports.allHunts = allHunts;
module.exports.allHuntsClient = allHuntsClient;
