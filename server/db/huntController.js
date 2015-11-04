var Hunt = require('./huntModel.js');
var User = require('./userModel.js');
var helper = require('../helpers.js')
var ObjectId = require('mongoose').Types.ObjectId;

var createHunt = function(user, hunt, callback) {
  var hunt = new Hunt(hunt);
  hunt.creator = user;
  hunt.save(function(err) {
    if(err) console.log("There was an error adding the hunt: ", err);
    callback(err, hunt);
  })
    .then(function(hunt) {
      User.findOneAndUpdate(
        {username: hunt.creator},
        {$push:{hunts:hunt._id}},
        {upsert: true}, 
        function(user) {console.log("~~HAI I AM IN THE CREATEHUNT FUNCION LOOK AT ME WEEEEEEEEEE USER: ", user)} 
        )
    }); 
};

var findHunt = function(huntName, callback) {
  Hunt.findOne({name: huntName})
    .populate('challenges')
    .exec(callback);
};

var findUsersHunts = function(username, callback) {
  User.find({username: username})
    .populate('hunts')
    .select('hunts')
    .exec(callback)
}

var allHunts = function(callback) {
  Hunt.find({})
    .populate('challenges')
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
module.exports.findUsersHunts = findUsersHunts; 
