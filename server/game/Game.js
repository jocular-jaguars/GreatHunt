var Game = function(hunt) {
  this.name = hunt.name;
  this.description = hunt.description;
  this.challenges = hunt.challenges;
  this.teams = [];
  this.started = false;
  this.finished = false;
  this.gameCode = this.makeGameCode();
}

Game.prototype.makeGameCode = function() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for( var i=0; i < 4; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

// Should this take an id?
Game.prototype.addTeam = function(teamName) {
  this.teams.push(teamName);
};

Game.prototype.startGame = function() {
  this.started = true;
};

Game.prototype.endGame = function() {
  this.finished = true;
};

module.exports = Game;