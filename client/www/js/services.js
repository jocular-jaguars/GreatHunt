angular.module('app.services', ['ngResource'])

.factory('GameService', function($resource){
  return $resource(
    '/api/game:id',
    {id: '@id'},
    {
      'update' : {method: 'PUT'},
      'create' : {method: 'POST'}
    }
  );
})

.factory('TeamService', function($resource){

  var data = $resource(
    'http://localhost:8000/api/team/:ahkr'
  );

  //calls every second
  var teams = data.query();

  return {
    getTeams: function() {
      return teams;
    }
  }
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