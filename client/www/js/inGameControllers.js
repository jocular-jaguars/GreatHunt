angular.module('app.inGameControllers', ['app.services', 'ngResource'])

.controller('challengeCtrl', function($scope) {

  //fake data until we've made server call
  $scope.description = "Don't forget your towel!";
  $scope.question = '123';

})

.controller('endGameCtrl', function($scope) {

})

.controller('dashboardCtrl', function($scope, teams) {
  //fake data until we've made server call
  // $scope.teams = teams;
});