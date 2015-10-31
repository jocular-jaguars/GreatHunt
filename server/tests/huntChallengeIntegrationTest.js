var expect = require('chai').expect;
var mongoose = require('mongoose');
var Hunt = require('../db/huntModel.js');
var HuntController = require('../db/HuntController.js');
var Challenge = require('../db/challengeModel.js');
var ChallengeController = require('../db/ChallengeController.js');

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
      var challenge1 = new Challenge({
        pictureURL: 'http://www.pawderosa.com/images/puppies.jpg',
        description: 'CUTE',
        question: 'What is this?',
        answers: 'puppy, doggy'
      });

      var challenge2 = new Challenge({
        pictureURL: 'http://images2.fanpop.com/image/photos/9400000/Aaaaaawwwwwwwwww-Sweet-puppies-9415255-1600-1200.jpg',
        description: 'So many puppies!',
        question: 'How many puppies?',
        answers: '10, ten'
      });

      var challenge3 = new Challenge({
        pictureURL: 'http://cdn2.hellogiggles.com/wp-content/uploads/2013/12/09/a-cutest-puppies-11.jpg',
        description: 'OH MY GOD WHAT IS THAT',
        question: 'What is scaring the puppy?',
        answers: 'creepy toy, teddy bear'
      });

      var challenge4 = new Challenge({
        pictureURL: 'http://www.melodytent.org/files/2015/03/Cute-Kittens-and-Puppies-Together-HD-Wallpaper-For-Desktop-Background.jpg',
        description: 'Frenimies??',
        question: 'What are the cat and dog doing?',
        answers: 'sleeping, cuddling'
      });

      challenge1.save();
      challenge2.save();
      challenge3.save();
      challenge4.save();

      var hunts = [
        {
          name: "hunt4",
          location: "San Francisco",
          description: "Our first test hunt",
          challenges: [challenge1._id, challenge2._id, challenge3._id],
          //creator: "Jocular Jaguars",
          private: false
        },
        {
          name: "hunt5",
          location: "Hack Reactor",
          description: "Scavenger Hunt around Hack Reactor",
          challenges: [challenge2._id, challenge3._id, challenge4._id],
          //creator: "Jocular Jaguars",
          private: false
        }
      ];
      Hunt.create(hunts, done);
    });
  });

//hunt controller tests
  xit("should put the hunt in the database", function(done) {
    HuntController.createHunt({
      name: "hunt6",
      location: "Golden Gate Park",
      description: "Explore Golden Gate Park",
      challenges: [challenge4._id, challenge1._id, challenge3._id, challenge4._id],
      //creator: "Jocular Jaguars",
      private: false
    });

    Hunt.findOne({name: "hunt6"})
      .exec(function(err, hunt) {
        console.log("I am in the test", hunt);
        expect(hunt).to.exist;
        expect(hunt.name).to.equal('hunt6');
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
        expect(hunt.name).to.equal("hunt4");
        done();
      });
    });
  });

  it("should return all the hunts in the database", function(done) {
    HuntController.allHunts(function(err, hunts) {
      expect(hunts.length).to.equal(2);
      console.log("In third test, findAll hunts ", hunts);
      done();
    });
  });

  it("should return only the name, and description of all the hunts in the database", function(done) {
    HuntController.allHuntsClient(function(err, hunts) {
      expect(hunts.length).to.equal(2);
      done();
    });
  });

  it("should find the challenge info when given the index of the challege in the hunt", function(done) {
    HuntController.findHunt("hunt5", function(err, hunt) {
      var challengeId1 = hunt.challenges[0]._id;
      ChallengeController.findChallenge({_id: challengeId1}, function(challenge) {
        console.log("the challenge question is: ", challenge.question, " challenge: ", challenge);
        expect(challenge.question).to.equal("How many puppies?");
        done();
      });
    });
  });

});
