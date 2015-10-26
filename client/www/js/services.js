angular.module('app.services', ['ngResource'])

// Store and retrieve from local serveice
.factory('LocalStorageService', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('GameService', function($resource) {

  var getGame = function(gameCode) {

    // gameCode is currently hard-coded. need to get gameCode from localStorage
    // when it's been set up
    var data = $resource(
      'http://localhost:8000/api/game/' + gameCode
    );

    return data.get().$promise.then(function(game) {
      return game;
    });
  };

  // Tell server to make a new game based on the hunt name
  var postGame = function(huntName) {
    var data = { huntName: huntName };

    var resource = $resource(
      'http://localhost:8000/api/game'
    );

    return resource.save(JSON.stringify(data)).$promise.then(function(data) {
      return data.gameCode;
    });
  };

  var startGame = function() {

    //NEED SERVER FUNCTION TO UPDATE GAME.STARTED

  }

  return {
    getGame: getGame,
    postGame: postGame
  };
})

.factory('TeamService', function($resource) {

  //future goal: name sure team name is unique!
  var makeTeam = function(name, gameCode) {

    var teamName = {teamName: name};

    var data = $resource(
      'http://localhost:8000/api/team/' + gameCode
    );

    return data.save(teamName).$promise.then(function(teamIndexObj) {
      return teamIndexObj;
    })

  };

  var getTeams = function() {

    // gameCode is currently hard-coded. need to get gameCode from localStorage
    // when it's been set up
    var data = $resource(
      'http://localhost:8000/api/team/ahkr'
    );

    return data.query().$promise.then(function(newTeams) {
      return newTeams;
    });
  };

  return { getTeams: getTeams,
           makeTeam: makeTeam };
})

.factory('HuntService', function($resource) {

  var data = $resource(
    'http://localhost:8000/api/hunts'
  );

  var hunts = data.query();

  return {
    getHunts: function() {
      return hunts;
    },
    getHunt: function(index) {
      return hunts[index];
    }
  }
});