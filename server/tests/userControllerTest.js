var expect = require('chai').expect;
var mongoose = require('mongoose');
var Hunt = require('../db/huntModel.js');
var User = require('../db/userModel.js');
var UserController = require('../db/UserController.js');


var dbURI = 'mongodb://localhost/hunt'

var clearDB = function(done) {
  mongoose.connection.collections['users'].remove(done);
}
describe('User Model', function() {
  //Connect to database first
  before(function(done) {
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });
  //clear database and then populate with hunts for the test
  beforeEach(function(done) {
    clearDB(function() {
      var users = [
        {
          username: "Ron",
          password: "Fenolio"
        }//,
        // {
        //   username: "Heidi",
        //   password: "Kumar"
        // }
      ];
      console.log(users);
      User.create(users, done);
    });
  });

//user controller tests
  it("should put the user in the database", function(done) {
    UserController.signup({
      username: "Kristin",
      password: "Mayer"
    }, function(err, user) {console.log(user)} );

    User.findOne({username: "Kristin"})
      .exec(function(err, user) {
        console.log("I am in the test", user);
        expect(user).to.exist;
        expect(user.username).to.equal('Kristin');
        //expect(user.hunts).to.be.a('array');
        done();
      });
  });

  it("should let the user sign in", function(done) {
    UserController.verifyUser({
      username: "Ron", 
      password: "Fenolio"
    }, function(err, user) {
      console.log("~~in test!~~ ",user);
      expect(user.username).to.equal('Ron');
      done(); 
    }); 
  })

  it("should not let the user sign in with the wrong password", function(done) {
    UserController.verifyUser({
      username: "Ron", 
      password: "Weasley"
    }, function(err, user) {
      expect(err).to.not.equal(undefined); 
      done(); 
    })
  })

});
