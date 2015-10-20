var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');
//Requirements for backend routes
var huntController = require('./db/huntController.js');
var game = require('./game/Game.js');
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

//Routes go here
app.get('/', function(req, res) {
  res.send('helllllooooooooo woooorld! :D');
});

//get 1 game object
app.get('/api/game:id', function(req, res) {

});
//create the game
app.post('/api/game', function(req, res) {
  huntController.findHunt(req.body.huntId, function(hunt) {
    var newGame = new Game(hunt);
    games[newGame.gameCode] = newGame;
    res.send(newGame);
  });
});
//update game state. "id"===gameCode
app.put('/api/game:id', function(req, res) {
  req.params.gameCode;
});

app.put('/api/nextChallenge:id', function(req, res) {
  req.params.gameId;
  req.body.teamNumber;
});
//delete game when game is over
app.delete('/api/game:id', function(req, res) {
  req.params.gameCode;
  [game].endGame();
  res.send('go to the end page, yo');
});

//team route
//set the team name
app.post('/api/team:id', function(req, res) {
  req.params.id; 
});

//hunt route
//get all the hunts from the database
app.get('/api/hunts', function(req, res) {
  huntController.allHunts(function(hunts) {
    console.log("weeeee!", hunts);
  });
});


app.listen(port, function() {
  console.log('Listening on port: ', port);
});

exports.app = app;
