var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');
//Requirements for backend routes
var huntController = require('./db/huntController.js');
var Game = require('./game/Game.js');
var Team = require('./game/Team.js');
var helpers = require('./helpers/routeHelpers.js');


var app = express();
var port = process.env.PORT || 8000;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/hunt';

console.log(mongoURI);
mongoose.connect(mongoURI);

app.use(parser.json());

// Serve static files in our client folder
app.use(express.static(__dirname + '/../client'));

//The game instance to store the games being played.
var games = {};
//game code
//update team route (they let us know if they passed the challenge)
//game state
//challenges (all of them)

//Routes go here
app.get('/', function(req, res) {
  res.send('helllllooooooooo woooorld! :D');
});

//get 1 game object
app.get('/api/game:gameCode', function(req, res) {
  var gameCode = req.params.gameCode;
  if(games[gameCode].startGame()) {
    var gameData = {};
    res.send(gameData);
  } else {
    var teams = {teams: games[gameCode].teams};
    res.send(teams);
  }
});
//create the game
app.post('/api/game', function(req, res) {
  huntController.findHunt(req.body.huntId, function(hunt) {
    var newGame = new Game(hunt);
    games[newGame.gameCode] = newGame;
    res.send(newGame);
  });
});
//update team status in the game.
app.put('/api/game:gameCode', function(req, res) {
  var game = req.params.gameCode;
  var team = req.body.teamIndex;
  games[game].teams[team].nextChallenge();
});

//TODO: delete game when game is over (not for MVP yo!)
// app.delete('/api/game:id', function(req, res) {
//   req.params.gameCode;
//   [game].endGame();
//   res.send('go to the end page, yo');
// });

//We need the game code so we can accurately assign teams to the game
app.post('/api/team:gameCode', function(req, res) {
  var game = req.params.gameCode;
  var team = new Team(req.body.teamName);
  var teams = games[gameCode].teams;
  var teamIndex = teams.length;
  teams.push(team);
  res.send(teamIndex);
});

//hunt route
//get all the hunts from the database
app.get('/api/hunts', function(req, res) {
  huntController.allHunts(function(hunts) {
    console.log("weeeee!", hunts);
    res.send(hunts);
  });
});


app.listen(port, function() {
  console.log('Listening on port: ', port);
});

exports.app = app;
