var User = require('./userModel.js');
var Hunt = require('./userModel.js');
//var ObjectId = require('mongoose').Types.ObjectId;
var Q    = require('q');
var jwt  = require('jwt-simple');

var verifyUser = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var findUser = Q.nbind(User.findOne, User);
  findUser({username: username})
    .then(function (user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else {
        return user.comparePasswords(password)
          .then(function (foundUser) {
            if (foundUser) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
            } else {
              return next(new Error('No user'));
            }
          });
      }
    })
    .fail(function (error) {
      next(error);
    });
}

var signup = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var create;
  var newUser;

  var findOne = Q.nbind(User.findOne, User);

  // check to see if user already exists
  findOne({username: username})
    .then(function (user) {
      if (user) {
        next(new Error('User already exist!'));
      } else {
        // make a new user if not one
        create = Q.nbind(User.create, User);
        newUser = {
          username: username,
          password: password
        };
        return create(newUser);
      }
    })
    .then(function (user) {
      // create token to send back for auth
      var token = jwt.encode(user, 'secret');
      res.json({token: token});
    })
    .fail(function (error) {
      next(error);
    });
}

//This may not be necessary
var checkAuth = function(req, res, next) {
  // checking to see if the user is authenticated
  // grab the token in the header is any
  // then decode the token, which we end up being the user object
  // check to see if that user exists in the database
  var token = req.headers['x-access-token'];
  console.log(token, ": is our token");
  if(!token) {
    next(new Error('No token'));
  } else {
    console.log("corrct path")
    var user = jwt.decode(token, 'secret');
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: user.username})
      .then(function(foundUser) {
        if(foundUser) {
          res.send(200);
        } else {
          res.send(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};

module.exports.verifyUser = verifyUser;
module.exports.signup = signup;
module.exports.checkAuth = checkAuth;