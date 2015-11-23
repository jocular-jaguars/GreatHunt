var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
//Requirements for backend routes
var huntController = require('./db/huntController.js');
var challengeController = require('./db/challengeController.js');
var userController = require('./db/userController.js')
var Game = require('./game/Game.js');
var Team = require('./game/Team.js');
var cors = require('cors');
var helpers = require('./helpers.js'); // custom middleware
var jwt = require('jwt-simple');

var app = express();
var port = process.env.PORT || 8000;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/hunt';

console.log(mongoURI);
mongoose.connect(mongoURI);

app.use(parser.json());
app.use(cors());

// Serve static files in our client folder
app.use(express.static(__dirname + '../client'));
app.set('client', express.static(__dirname + '../client'));

// Require token decode when user tries to access this route
// app.use('/api/hunts', helpers.decode);
app.use('/api/hunt', helpers.decode);
app.use(helpers.errorLogger);
app.use(helpers.errorHandler);


//The game instance to store the games being played.
var games = {
  'ahkr' : {
    teams: [{name: "Jocular Jaguars", currentChallenge: 7},
            {name: "Wesley Crushers", currentChallenge: 2},
            {name: "Charlie Chaplins", currentChallenge: 4}],
    started: false
  }
};

//Routes go here
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/web.html');
});

//user sign in and authentication
app.post('/api/signin', function(req, res, next){
  userController.verifyUser(req, res, next);
});

app.use('/api/signin', helpers.errorLogger);
app.use('/api/signin', helpers.errorHandler);

app.post('/api/signup', function(req, res, next){
  userController.signup(req, res, next);
});

app.use('/api/signup', helpers.errorLogger);
app.use('/api/signup', helpers.errorHandler);

//get one game object
app.get('/api/game/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode.toLowerCase();
  //if gameCode is not in the games object or game state is set to "finished" from app.delete request
  if(!(gameCode in games) || games[gameCode].finished) {
    res.send({gameNotFound: true});
  } else {
    if(games[gameCode].started) {
      res.send(JSON.stringify(games[gameCode]));
    } else {
      var teams = {teams: games[gameCode].teams};
      res.send(teams);
    }
  }
});

// send the teams to the front end
app.get('/api/team/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode.toLowerCase();
  res.send(JSON.stringify(games[gameCode].teams));
});

//hunt route

app.post('/api/checkHuntName', function(req, res) {
  huntController.findHunt(req.body.name, function(err, hunt) {
    console.log('hunt Name: ', req.body.name);
    console.log("error: ", err);
    console.log("hunt: ", hunt);
    if (hunt) {
      console.log('womp womp, no error, the hunt already exists')
      res.send({validName: false});
    } else {
      res.send({validName: true});
    }
  })
});

//get all the hunts from the database
app.get('/api/hunts', function(req, res) {
  huntController.allHunts(function(err, hunts) {
    // if no token exists, only send public hunts
    var token = req.headers['x-access-token'];
    console.log("token: ", token);
    if (!token) {
      var allHunts = {
        publicHunts: hunts,
        userHunts: []
      };
      res.send(allHunts);
    } else {
      var user = jwt.decode(token, 'secret');
      console.log("user: ", user);
      huntController.findUsersHunts(user.username, function(err, userHunts) {
        if(err) res.send(err);
        else {
          var allHunts = {
            publicHunts: hunts,
            userHunts: userHunts[0].hunts
          };
          res.send(allHunts);
        }
      });
    }
  });
});

//create the game
app.post('/api/game', function(req, res) {
  huntController.findHunt(req.body.huntName, function(err, hunt) {
    var newGame = new Game(hunt);
    games[newGame.gameCode] = newGame;
    res.send({gameCode: newGame.gameCode});
  });
});

//update team status in the game; send team to next challenge.
app.put('/api/game/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode.toLowerCase();
  console.log("gameCode: ", gameCode);
  var teamIndex = req.body.teamIndex;
  if (req.body.stopTime !== false) {
    games[gameCode].teams[teamIndex]['stopTime'] = req.body.stopTime;
  }
  games[gameCode].teams[teamIndex].nextChallenge();
  console.log(games[gameCode].teams);
  res.end();
});

// start the game from the game creator
app.put('/api/gameStart/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode.toLowerCase();
  games[gameCode].started = true;
  games[gameCode].startTime = Date.now();
  res.end();
});

//We need the game code so we can accurately assign teams to the game
app.post('/api/team/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode.toLowerCase();
  console.log('gameCode: ', gameCode);
  var team = new Team(req.body.teamName);
  var teams = games[gameCode].teams;
  var teamIndex = teams.length;
  var teamIndexObj = {teamIndex: teamIndex};
  teams.push(team);
  res.send(JSON.stringify(teamIndexObj));
});

//For the form input

//Post challenges to database
//Don't forget to return the new challenge id from database
app.post('/api/challenge', function(req, res) {
  challengeController.createChallenge(req.body.challenge, function(err, challenge) {
    if(err) {
      var str = "There was an error processing your challenge: "+err;
      res.send(str);
    } else {
      var challengeId = challenge._id;
      res.send(challengeId);
    }
  });
});

app.post('/api/hunt', function(req, res) {
  console.log('hunt in app.post: ', req.body.hunt);
  var user = req.user;
  console.log("user", user, "\n", "username: ", user.username);
  huntController.createHunt(user.username, req.body.hunt, function(err, hunt) {
    if(err){
      var str = "There was an error processing your hunt: "+err
      res.send({error: str});
    } else {
      console.log(hunt, "~~~user~~~", user);
      res.send({huntName: req.body.hunt.name});
    }
  });
});

//delete game object when game is completed
app.delete('/api/game/:gameCode', function(req, res) {
  var gameCode = req.params.gameCode;
  console.log("games[gameCode] ",games[gameCode], "\ngames: ", games, " gameCode: ", gameCode);
  games[gameCode].finished = true;
  res.send({deleted: true});
});


app.listen(port, function() {
  console.log('Listening on port: ', port);
});

exports.app = app;
