angular.module('app.services', ['ngResource'])

.factory('game', [function($resource){
  return $resource(
    'api/game:id',
    {id: '@id'},
    {
      'update' : {method: 'PUT'},
      'create' : {method: 'POST'}
    }
  );
}])

.factory('team', [function($resource){
  return $resource(
    'api/team:id',
    {id: '@id'},
    {
      'make' : {method: 'POST'}
    }
  );
}])

.factory('hunts', [function($resource){
  return $resource(
    'api/hunts'
  );
}]);
