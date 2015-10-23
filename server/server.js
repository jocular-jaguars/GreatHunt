var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
//Requirements for backend routes
var huntController = require('./db/huntController.js');
var Game = require('./game/Game.js');
var Team = require('./game/Team.js');
var cors = require('cors');
//deleted the following file (unnecessary):
// var helpers = require('./helpers/routeHelpers.js');


var app = express();
var port = process.env.PORT || 8000;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/hunt';

console.log(mongoURI);
mongoose.connect(mongoURI);

app.use(parser.json());
app.use(cors());

// Serve static files in our client folder
app.use(express.static(__dirname + '/../client'));

//The game instance to store the games being played.
var games = {};

//Routes go here
app.get('/', function(req, res) {
  res.send('helllllooooooooo woooorld! :D');
});

//get one game object
app.get('/api/game/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode;
  if(games[gameCode].startGame()) {
    var gameData = {};
    res.send(gameData);
  } else {
    var teams = {teams: games[gameCode].teams};
    res.send(teams);
  }
});

// send the teams to the front end
app.get('/api/team/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode;
  res.send(JSON.stringify(games[gameCode].teams));
});

//hunt route
//get all the hunts from the database
app.get('/api/hunts', function(req, res) {
  huntController.allHunts(function(err, hunts) {
    console.log("weeeee!", hunts);
    res.send(hunts);
  });
});

//create the game
app.post('/api/game', function(req, res) {
  huntController.findHunt(req.body.huntName, function(err, hunt) {
    var newGame = new Game(hunt);
    games[newGame.gameCode] = newGame;
    res.send(newGame.gameCode);
  });
});

//update team status in the game; send team to next challenge.
app.put('/api/game/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode;
  var teamIndex = req.body.teamIndex;
  games[gameCode].teams[teamIndex].nextChallenge();
  res.end();
});

//We need the game code so we can accurately assign teams to the game
app.post('/api/team/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode;
  console.log('gameCode: ', gameCode);
  var team = new Team(req.body.teamName);
  var teams = games[gameCode].teams;
  var teamIndex = teams.length;
  var teamIndexObj = {teamIndex: teamIndex};
  teams.push(team);
  //console.log("team: ", team, "teams: ", teams);
  //console.log("games: ", games);
  res.send(JSON.stringify(teamIndexObj)); //instead of teamIndexObj, teamIndex also works.
});

//TODO: delete game when game is over (not for MVP yo!)
// app.delete('/api/game:id', function(req, res) {
//   req.params.gameCode;
//   [game].endGame();
//   res.send('go to the end page, yo');
// });

app.listen(port, function() {
  console.log('Listening on port: ', port);
});

exports.app = app;
