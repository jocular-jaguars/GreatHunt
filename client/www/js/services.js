// comment out the version you aren't using

// local
// var root = 'http://localhost:8000';
// deploy
var root = 'https://thegreathunt.herokuapp.com';


angular.module('app.services', ['ngResource'])

// Store and retrieve from local serveice
.factory('LocalStorageService', ['$window', function($window) {
  return {
    set: function(key, value) {
      //stringify the value as it may be obj or array
      $window.localStorage[key] = JSON.stringify(value);
    },
    get: function(key) {
      //re-translating and returning obj or array at key
      return JSON.parse($window.localStorage[key] || null);
    },
    delete: function(key) {
      //remove key
      $window.localStorage.removeItem(key);
    },
    deleteAll: function() {
      //remove all keys
      this.delete("creator");
      this.delete("gameCode");
      this.delete("teamIndex");
      this.delete("huntName");
      this.delete("huntDescription");
      this.delete("started");
      this.delete("finished");
      this.delete("currentChallenge");
      this.delete("challenges");
      this.delete("registered");
      this.delete("newChallenges");
      this.delete("newHuntName");
      this.delete("currentView");
    }
  }
}])

.factory('GameService', function($resource) {

  var getGame = function(gameCode) {

    //sets up server call
    var data = $resource(
      root + '/api/game/' + gameCode
    );

    //get() assigns request type
    //$promise handles async and allows us to pass on and return game
    return data.get().$promise.then(function(game) {
      return game;
    });
  };

  // Tell server to make a new game based on the hunt name
  var postGame = function(huntName) {

    //needs to be saved as property on obj for server
    var data = { huntName: huntName };

    var resource = $resource(
      root + '/api/game/'
    );

    //save is a post request
    return resource.save(JSON.stringify(data)).$promise.then(function(data) {
      return data.gameCode;
    });
  };

  var startGame = function(gameCode) {

    var resource = $resource(
      root + '/api/gameStart/' + gameCode,
      //paramDefaults = null
      null,
      {
        //any additional or custom methods here
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
    //must be object based on how server looks at the object it gets
    var teamName = {teamName: name};

    var data = $resource(
       root + '/api/team/' + gameCode
    );

    return data.save(teamName).$promise.then(function(teamIndexObj) {
      return teamIndexObj;
    })

  };

  var getTeams = function(gameCode) {
    var data = $resource(
      root + '/api/team/' + gameCode
    );

    return data.query().$promise.then(function(newTeams) {
      return newTeams;
    });
  };

  var updateTeam = function(teamIndex, gameCode) {
    var teamUpdate = {teamIndex: teamIndex};

    var resource = $resource(
      root + '/api/game/' + gameCode,
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

  // Hold the hunts downloaded from server
  var hunts;

  //Factory variable to hold new hunt data before it is sent to database
  var newHunt = { challenges: [] };

  var getHunts = function() {
    var data = $resource(
      root +'/api/hunts'
    );
    //query is a get request which must return an array
    hunts = data.query();
    return hunts;
  };

  var getHunt = function(index) {
      return hunts[index];
  };

  var addChallenge = function(challenge) {

    //$http works the same as resource but doesn't need $promise chainging and
    //has the method up-front.
    return $http({
      method: 'POST',
      url: root + '/api/challenge',
      data: {challenge: challenge}
    })
      .then(function(challengeId) {
        //calling internal function to push to newHunt array
        addChallengeToHunt(challengeId.data);
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

    //format needed for server's recieved data object
    var hunt = {hunt: newHunt};

    var data = $resource(
        root + '/api/hunt'
      )

    return data.save(hunt)
      .$promise
      .then(function(res) {
        return res;
      })
  };

  //return statement assigns what can be accessed outside this factory
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
