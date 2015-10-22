var Team = function(name) {
  this.name = name;
  this.currentChallenge = 0;
};

Team.prototype.nextChallenge = function() {
  this.currentChallenge++;
};

Team.prototype.toString = function () {
  var str = '{name:' + this.name + ',currentChallenge:' + this.currentChallenge + '}'; 
};

module.exports = Team;
