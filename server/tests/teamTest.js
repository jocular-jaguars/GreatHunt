var expect = require('chai').expect;
var mongoose = require('mongoose');
var Team = require('../game/Team.js');



describe('Team ', function() {
  beforeEach(function(done) {
    team = new Team({
      name: 'teamName',
      currentChallenge: 0 
    });
    done();
  });

  it('should have a nextChallenge function', function(done) {
    expect(team.nextChallenge).to.exist;
    done();
  });

  it('should increment the current challenge', function(done) {
    team.nextChallenge();
    team.nextChallenge();
    expect(team.currentChallenge).to.equal(2);
    done();
  });
});
