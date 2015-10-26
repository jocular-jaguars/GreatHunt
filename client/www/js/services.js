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

  var startGame = function(gameCode) {

    var resource = $resource(
      'http://localhost:8000/api/gameStart/' + gameCode,
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

// .factory('HuntService', function($resource) {
//
//   var data = $resource(
//     'http://localhost:8000/api/hunts'
//   );
//
//   var hunts = data.query();
//
//   return {
//     getHunts: function() {
//       return hunts;
//     },
//     getHunt: function(index) {
//       return hunts[index];
//     }
//   }
// });
.factory('HuntService', function($resource) {

  var data = $resource(
    'http://localhost:8000/api/hunts'
  );

  var hunts = data.query();

  //Factory variable to hold new hunt data before it is sent to database
  var newHunt = {};

  var addChallenge = function(challenge) {
    return $http({
      method: 'POST',
      url: 'http://localhost:8000/api/challenge',
      data: {challenge: challenge}
    })
      .then(function(challengeId) {
        addChallengeToHunt(challengeId);
        $location.path('/previewHunt');
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
  };

  var addChallengeToHunt = function(challengeId) {
    newHunt.challenges.push(challengeId);
  };

  var addHunt = function(hunt) {
    //post method TODO: add new backend api route
    //TODO: use $resource, and if I use $resource,
    //I must use $promise.then(...) for promises
    return $http({
      method: 'POST',
      url: 'http://localhost:8000/api/hunts',
      data: {hunt: hunt}
    })
    .then(function(res) {
      //TODO: figure out the path here.
      //Also, use $state.go('/pathName');
      $location.path('/');
      return res;
    })
  }
  //};

  return {
    getHunts: function() {
      return hunts;
    },
    getHunt: function(index) {
      return hunts[index];
    },
    addHunt: addHunt,
    addChallenge: addChallenge,
    createHunt: createHunt,
    addChallengeToHunt: addChallengeToHunt,
    newHunt: newHunt
  }
});
