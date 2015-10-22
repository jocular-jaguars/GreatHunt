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

.factory('hunts', function($resource){
  return $resource(
    '/api/hunts'
  );
})

.factory('HuntService', function() {
  var hunts = [
    { name: "SF Hunt", location: "San Francisco", description: "Best one ever!" },
    { name: "Halloween Hunt", location: "Spooky Place", description: "Don't die!" },
    { name: "NY Hunt", location: "New York", description: "Who's that lady with the torch?" },
  ];

  return {
    hunts: hunts,

    getHunts: function() {
      return this.hunts;
    },

    getHunt: function(index) {
      return hunts[index];
    }
  }
});