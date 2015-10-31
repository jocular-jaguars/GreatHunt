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
      User.create(users, done);
    });
  });

//hunt controller tests
  xit("should put the user in the database", function(done) {
    UserController.signup({
      name: "Kristin",
      password: "Mayer"

    }, function(user) {console.log(user)});

    User.findOne({username: "Kristin"})
      .exec(function(err, user) {
        //console.log("I am in the test", hunt);
        expect(user).to.exist;
        expect(user.username).to.equal('Kristin');
        expect(user.hunts).to.be.a('array');
        done();
      });


  });

  it("should find the user in the database", function(done) {
    UserController.getUser(function(err, users) {
      expect(user.username).to.equal('Ron')
    });
  });

  xit("should return all the hunts in the database", function(done) {
    HuntController.allHunts(function(err, hunts) {

      done();
    });
  });

  xit("should return only the name, and description of all the hunts in the database", function(done) {
    HuntController.allHuntsClient(function(err, hunts) {
      //console.log(hunts, "~~client side hunts info~~");
      expect(hunts.length).to.equal(2);
      done();
    });
  });

});
