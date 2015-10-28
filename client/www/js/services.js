  angular.module('app.services', ['ngResource'])

// Store and retrieve from local serveice
.factory('LocalStorageService', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    get: function(key) {
      return JSON.parse($window.localStorage[key] || null);
    }
  }
}])

.factory('GameService', function($resource) {

  var getGame = function(gameCode) {

    var data = $resource(
      'http://localhost:8000/api/game/' + gameCode ||
      'https://thegreathunt.herokuapp.com/api/game/' + gameCode
    );

    return data.get().$promise.then(function(game) {
      return game;
    });
  };

  // Tell server to make a new game based on the hunt name
  var postGame = function(huntName) {
    var data = { huntName: huntName };

    var resource = $resource(
      'http://localhost:8000/api/game/' ||
      'https://thegreathunt.herokuapp.com/api/game'
    );

    return resource.save(JSON.stringify(data)).$promise.then(function(data) {
      return data.gameCode;
    });
  };

  var startGame = function(gameCode) {

    var resource = $resource(
      'http://localhost:8000/api/gameStart/' + gameCode ||
      'https://thegreathunt.herokuapp.com/api/gameStart/' + gameCode,
      null,
      {
        'update': {method: 'PUT'}
      });

    return resource.update().$promise.then(function(){
      //need to add success confirmation.
      return true;
    });
  };

  return {
    getGame: getGame,
    postGame: postGame,
    startGame: startGame
  };
})

.factory('TeamService', function($resource) {

  //future goal: name sure team name is unique!
  var makeTeam = function(name, gameCode) {

    var teamName = {teamName: name};

    var data = $resource(
      'http://localhost:8000/api/team/' + gameCode ||
      'https://thegreathunt.herokuapp.com/api/team/' + gameCode
    );

    return data.save(teamName).$promise.then(function(teamIndexObj) {
      return teamIndexObj;
    })

  };

  var getTeams = function(gameCode) {
    var data = $resource(
      'http://localhost:8000/api/team/' + gameCode ||
      'https://thegreathunt.herokuapp.com/api/team/' + gameCode
    );

    return data.query().$promise.then(function(newTeams) {
      return newTeams;
    });
  };

  var updateTeam = function(teamIndex, gameCode) {
    var teamUpdate = {teamIndex: teamIndex};

    var resource = $resource(
      'http://localhost:8000/api/game/' + gameCode,
      null,
      {
        'update': {method: 'PUT'}
      }
    );

    return resource.update(teamUpdate).$promise.then(function() {
      return true;
    });
  };

  return { getTeams: getTeams,
           makeTeam: makeTeam,
           updateTeam: updateTeam };
})

.factory('HuntService', function($resource, $http, $state) {

  var hunts;

  //Factory variable to hold new hunt data before it is sent to database
  var newHunt = {};

  var getHunts = function() {
    var data = $resource(
      'http://localhost:8000/api/hunts'
      || 'https://thegreathunt.herokuapp.com/api/hunts'
    );
    hunts = data.query();
    return hunts;
  };

  var getHunt = function(index) {
      return hunts[index];
  };

  var addChallenge = function(challenge) {
    return $http({
      method: 'POST',
      url: 'http://localhost:8000/api/challenge'
        || 'https://thegreathunt.herokuapp.com/api/challenge',
      data: {challenge: challenge}
    })
      .then(function(challengeId) {
        addChallengeToHunt(challengeId.data);
        console.log('challengeId: ', challengeId);
        console.log('newHunt: ', newHunt);
        console.log('challengeId.data: ', challengeId.data);
        $state.go('previewHunt');
      })
  };

  var createHunt = function(hunt) {
    //initialize the hunt here, and store locally until it is ready to submit to the database
    newHunt = {
      name: hunt.name,
      location: hunt.location,
      description: hunt.description,
      challenges: [],
      private: false
    }
    return newHunt;
  };

  var addChallengeToHunt = function(challengeId) {
    newHunt.challenges.push(challengeId);
  };

  var addHuntToDatabase = function() {

    var hunt = {hunt: newHunt};

    var data = $resource(
        'http://localhost:8000/api/hunt' ||
        'https://thegreathunt.herokuapp.com/api/hunt'
      )

    return data.save(hunt)
      .$promise
      .then(function(res) {
        console.log('response in addHuntToDatabase service: ', res);
        return res;
      })
  };

  return {
    getHunts: getHunts,
    getHunt: getHunt,
    addHuntToDatabase: addHuntToDatabase,
    addChallenge: addChallenge,
    createHunt: createHunt,
    addChallengeToHunt: addChallengeToHunt,
    newHunt: newHunt
  }
});
