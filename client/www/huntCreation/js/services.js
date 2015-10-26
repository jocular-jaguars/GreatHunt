angular.module('app.services', [])
//any routes must be passed
// .factory('BlankFactory', [function(){
//
// }])
// I pulled the following factory from the services.js file from out project
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
      url: '/api/challenge',
      data: {challenge: challenge};
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
      private: false;
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
        url: '/api/hunts',
        data: {hunt: hunt}
      })
      .then(function(res) {
        //TODO: figure out the path here.
        //Also, use $state.go('/pathName');
        $location.path('/');
        return res;
      })
    }
  };

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
  });
