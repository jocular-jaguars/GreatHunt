angular.module('app.services', ['ngResource'])

.factory('game', function($resource){
  return $resource(
    '/api/game:id',
    {id: '@id'},
    {
      'update' : {method: 'PUT'},
      'create' : {method: 'POST'}
    }
  );
})

.factory('team', function($resource){
  return $resource(
    '/api/team:id',
    {id: '@id'},
    {
      'make' : {method: 'POST'}
    }
  );
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