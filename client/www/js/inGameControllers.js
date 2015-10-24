angular.module('app.inGameControllers', ['app.services', 'ngResource'])

.controller('challengeCtrl', function($scope) {

  //fake data until we've made server call
  $scope.description = "Don't forget your towel!";
  $scope.question = '123';

})

.controller('endGameCtrl', function($scope, $rootScope) {

})

.controller('dashboardCtrl', function ($scope, $interval, $state, TeamService) {

  var timer = $interval(function() {
    TeamService.getTeams().then(function(teams) {
      $scope.teams = teams;
    })
  }, 3000);

  // if the future, may be better to stop timer upon page redirect so new
  // timers are not created every time the dashboard is loaded
  $scope.stopGameUpdate = function() {
    $interval.cancel(timer);
    $state.go('tabs.welcome');
  }

});