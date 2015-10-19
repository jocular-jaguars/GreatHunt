var expect = require('chai').expect;
var mongoose = require('mongoose');
var Game = // import game class



describe('Game ', function() {
  beforeEach(function(done) {
    game = new Game();
  };

  it('should have a make gamecode function', function(done) {
    expect(game.makeGameCode).to.exist;
    expect(game.gameCode).to.be.a('string');
    expect(game.gameCode.length).to.equal(4);
    done();
  });

  it('should have an associated hunt', function(done) {
    expect(game.hunt).to.exist;
    expect(game.hunt.description).to.exist;
    done();
  });

  it('should add team to a game', function(done) {
    expect(game.addTeam).to.exist();
    expect(game.teams.length).to.equal(0);
    game.addTeam('1234');
    expect(game.teams.length).to.equal(1);
    done();
  });

  it('should have a startGame function', function(done) {
    expect(game.startGame).to.exist;
    expect(game.started).to.equal(false);
    game.startGame();
    expect(game.started).to.equal(true);
  })

  it('should have an endGame function', function(done) {
    expect(game.endGame).to.exist;
  });
});


var expect = require('chai').expect;
var mongoose = require('mongoose');
var Hunt = require('../db/huntModel.js');
var Challenge = require('../db/challengeModel.js')

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
          creator: "Jocular Jaguars",
          private: false
        },
        {
          name: "hunt2",
          location: "Hack Reactor",
          description: "Scavenger Hunt around Hack Reactor",
          challenges: [],
          creator: "Jocular Jaguars",
          private: false
        }
      ]

      Hunt.create(hunts, done);
    });
  });

  it("should put the hunt in the database", function(done) {
    console.log(Challenge,"<--challenge ", Hunt.schema, "I am in the test! :D");
    var hunt = Hunt.createHunt({
      name: "hunt3",
      location: "Golden Gate Park",
      description: "Explore Golden Gate Park",
      challenges: [],
      creator: "Jocular Jaguars",
      private: false
    });

    Hunt.findOne({name: "hunt3"})
      .exec(function(err, hunt) {
        expect(hunt).to.exist;
        expect(hunt.name).to.equal('hunt3');
        expect(hunt.location).to.equal('Golden Gate Park');
        expect(hunt.private).to.be.a('boolean');
        expect(hunt.challenges).to.be.a('array');
        done();
      });


  });

  it("should find the hunt in the database", function(done) {
    Hunt.findHunt({_id: 1}, function(err, hunt) {
      console.log(hunt);
      expect(hunt._id).to.equal(1);
      expect(hunt.name).to.equal("hunt2");
      done();
    });
  });

  it("should return all the hunts in the database", function(done) {
    Hunt.allHunts(function(err, hunts) {
      console.log(hunts);
      done();
    });
  });

});
