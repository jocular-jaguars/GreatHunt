var Team = function(name) {
  this.name = name;
  this.currentChallenge = 0;
};

Team.prototype.nextChallenge = function() {
  this.currentChallenge++;
};

module.exports = Team;
