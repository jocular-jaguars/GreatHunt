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

  return {
    getHunts: function() {
      return hunts;
    },
    getHunt: function(index) {
      return hunts[index];
    }
  }

.service('BlankService', [function(){

}]);
