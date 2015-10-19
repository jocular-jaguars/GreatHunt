var expect = require('chai').expect;
var mongoose = require('mongoose');
var Challenge = require('../db/challengeModel.js');
var ChallengeController = require('../db/challengeController.js');

var dbURI = 'mongodb://localhost/hunt'

var clearDB = function(done) {
  mongoose.connection.collections['challenges'].remove(done);
}
describe('Challenge Model', function() {
  //Connect to database first
  before(function(done) {
    if(mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  //clear database and then populate with challenges for the test
  beforeEach(function(done) {
    clearDB(function() {
      //console.log("Make the challenges!!");
      var challenges = [
        {
          pictureURL: 'http://www.pawderosa.com/images/puppies.jpg',
          description: 'CUTE',
          question: 'What is this?',
          answers: ['puppy', 'doggy']
        },
        {
          pictureURL: 'http://images2.fanpop.com/image/photos/9400000/Aaaaaawwwwwwwwww-Sweet-puppies-9415255-1600-1200.jpg',
          description: 'So many puppies!',
          question: 'How many puppies?',
          answers: ['10', 'ten']
        },
        {
          pictureURL: 'http://cdn2.hellogiggles.com/wp-content/uploads/2013/12/09/a-cutest-puppies-11.jpg',
          description: 'OH MY GOD WHAT IS THAT',
          question: 'What is scaring the puppy?',
          answers: ['creepy toy', 'teddy bear']
        }
      ];
      //console.log(challenges, '<--challenges');
      Challenge.create(challenges, done);
    });
  });


//challenge controller tests
  it("should create a new challenge", function(done) {
    ChallengeController.createChallenge({
      pictureURL: 'http://www.melodytent.org/files/2015/03/Cute-Kittens-and-Puppies-Together-HD-Wallpaper-For-Desktop-Background.jpg',
      description: 'Frenimies??',
      question: 'What are the cat and dog doing?',
      answers: ['sleeping', 'cuddling']
    }, function(challenge) {console.log(challenge); });

    Challenge.findOne({description: 'Frenimies??'})
      .exec(function(err, challenge) {
        console.log("in the test ", challenge);
        expect(challenge).to.exist;
        expect(challenge.pictureURL).to.equal('http://www.melodytent.org/files/2015/03/Cute-Kittens-and-Puppies-Together-HD-Wallpaper-For-Desktop-Background.jpg');
        expect(challenge.question).to.equal('What are the cat and dog doing?');
        expect(challenge.answers.length).to.equal(2);
        expect(challenge.answers[0]).to.equal('sleeping');
        done();
      });
  });

  it("should return all the challenges from the database", function(done) {
    ChallengeController.allChallenges(function(challenges) {
      expect(challenges.length).to.equal(3);
      done();
    });
  });

  it("should find a challenge, when given a challenge id", function(done) {
    ChallengeController.allChallenges(function(challenges) {
      var firstChallengeID = challenges[0]._id;
      console.log("first challenge id: ", firstChallengeID);
      ChallengeController.findChallenge({_id: firstChallengeID}, function(challenge) {
        console.log("challenge is: ", challenge);
        //expect(challenge._id).to.equal(firstChallengeID);
        expect(challenge.question).to.equal("What is this?");
        done();
      });
    });
  });
});
