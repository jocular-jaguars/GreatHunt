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

  var addChallengeToHunt = function() {

  };

  var addHunt = function() {
    //post method TODO: add new backend api route
    //TODO: use $resource, and if I use $resource,
    //I must use $promise.then(...) for promises
      return $http({
        method: 'POST',
        url: '/api/hunts',
        data: project
      })
      .then(function (resp) {
        //TODO: figure out the path here.
        //Also, use $state.go('/pathName');
        $location.path('/hunts');
        return resp;
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
    addHunt: addHunt
  });
