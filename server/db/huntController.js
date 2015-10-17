var Hunt = require('./huntModel.js');

var createHunt = function(hunt) {
  var hunt = new Hunt(hunt);
  hunt.save(function(err) {
    if(err) console.log("There was an error adding the hunt: ", err);
  })
};


var findHunt = function (huntId, callback) {
  Hunt.findOne({_id: huntId}, function(err, hunt) {
    if(err) console.log("There was an error finding the hunt: ", err);
    callback(hunt);
  });
};


var allHunts = function (callback) {
  Hunt.find(function(err, hunts) {
    if(err) console.log("There was an error retriving the hunts: ", err);
    callback(hunts);
  });
};

module.exports.createHunt = createHunt;
module.exports.findHunt = findHunt;
module.exports.allHunts = allHunts;
