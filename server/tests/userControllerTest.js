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
          name: "hunt1",

        },
        {
          name: "hunt2",

        }
      ];
      User.create(users, done);
    });
  });

//hunt controller tests
  it("should put the user in the database", function(done) {
    UserController.createUser({
      name: "hunt3",

    }, function(user) {console.log(user)});

    Hunt.findOne({username: "Kristin"})
      .exec(function(err, user) {
        //console.log("I am in the test", hunt);
        expect(user).to.exist;
        expect(user.username).to.equal('hunt3');
        expect(user.hunts).to.be.a('array');
        done();
      });


  });

  it("should find the user in the database", function(done) {
    UserController.findUser(function(err, users) {

    });
  });

  it("should return all the hunts in the database", function(done) {
    HuntController.allHunts(function(err, hunts) {

      done();
    });
  });

  it("should return only the name, and description of all the hunts in the database", function(done) {
    HuntController.allHuntsClient(function(err, hunts) {
      //console.log(hunts, "~~client side hunts info~~");
      expect(hunts.length).to.equal(2);
      done();
    });
  });

});
