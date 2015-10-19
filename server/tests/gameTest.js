var expect = require('chai').expect;
var mongoose = require('mongoose');
var Game = require('../game/Game.js');
var Team = require('../game/Team.js');




describe('Game ', function() {
  beforeEach(function(done) {
    game = new Game({
      name: 'test',
      description: 'game description',
      challenges: [], 
    });
    done();
  });

  it('should have a make gamecode function', function(done) {
    expect(game.makeGameCode).to.exist;
    expect(game.gameCode).to.be.a('string');
    expect(game.gameCode.length).to.equal(4);
    done();
  });

  it('should add team to a game', function(done) {
    var team = new Team('Jocular Jaguars')
    expect(game.addTeam).to.exist;
    expect(game.teams.length).to.equal(0);
    game.addTeam(team);
    expect(game.teams.length).to.equal(1);
    done();
  });

  it('should have a startGame function', function(done) {
    expect(game.startGame).to.exist;
    expect(game.started).to.equal(false);
    game.startGame();
    expect(game.started).to.equal(true);
    done();
  })

  it('should have an endGame function', function(done) {
    expect(game.endGame).to.exist;
    game.endGame();
    expect(game.finished).to.equal(true);
    done();
  });
});
