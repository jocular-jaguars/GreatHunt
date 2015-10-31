var expect = require('chai').expect;
var mongoose = require('mongoose');
var Hunt = require('../db/huntModel.js');
var HuntController = require('../db/HuntController.js');


var dbURI = 'mongodb://localhost/hunt'

var clearDB = function(done) {
  mongoose.connection.collections['hunts'].remove(done);
}
describe('Hunt Model', function() {
  //Connect to database first
  before(function(done) {
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  //clear database and then populate with hunts for the test
  beforeEach(function(done) {
    clearDB(function() {
      var hunts = [
        {
          name: "hunt1",
          location: "San Francisco",
          description: "Our first test hunt",
          challenges: [],
          //creator: "Jocular Jaguars",
          private: false
        },
        {
          name: "hunt2",
          location: "Hack Reactor",
          description: "Scavenger Hunt around Hack Reactor",
          challenges: [],
          //creator: "Jocular Jaguars",
          private: false
        }
      ];
      Hunt.create(hunts, done);
    });
  });

//hunt controller tests
  it("should put the hunt in the database", function(done) {
    HuntController.createHunt({
      name: "hunt3",
      location: "Golden Gate Park",
      description: "Explore Golden Gate Park",
      challenges: [],
      //creator: "Jocular Jaguars",
      private: false
    }, function(hunt) {console.log(hunt)});

    Hunt.findOne({name: "hunt3"})
      .exec(function(err, hunt) {
        //console.log("I am in the test", hunt);
        expect(hunt).to.exist;
        expect(hunt.name).to.equal('hunt3');
        expect(hunt.location).to.equal('Golden Gate Park');
        expect(hunt.private).to.be.a('boolean');
        expect(hunt.challenges).to.be.a('array');
        done();
      });


  });

  it("should find the hunt in the database", function(done) {
    HuntController.allHunts(function(err, hunts) {
      var firstHuntName = hunts[0].name;
      HuntController.findHunt(firstHuntName, function(err, hunt) {
        expect(hunt.name).to.equal("hunt1");
        done();
      });
    });
  });

  it("should return all the hunts in the database", function(done) {
    HuntController.allHunts(function(err, hunts) {
      expect(hunts.length).to.equal(2);
      //console.log("In third test, findAll hunts ", hunts);
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
