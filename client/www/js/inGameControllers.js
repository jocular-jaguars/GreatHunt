angular.module('app.inGameControllers', ['app.services', 'ngResource'])

.controller('challengeCtrl', function($scope) {

  //fake data until we've made server call
  $scope.description = "Don't forget your towel!";
  $scope.question = '123';
  $scope.correctAnswer = 'hello';  // for testing. use localscope game object
  $scope.current = {};
  $scope.current.input;

  $scope.submitAnswer = function() {
    console.log("submitted my answer to the server!");
  }

  // Check if user input answer is wrong
  $scope.isWrong = function() {
    return ($scope.correctAnswer !== $scope.current.input);
  }

})

.controller('endGameCtrl', function($scope, $rootScope) {

})

.controller('dashboardCtrl', function ($scope, $rootScope, $interval, $state, TeamService) {

  var timer = $interval(function() {
    TeamService.getTeams().then(function(teams) {
      $scope.teams = teams;
    })
  }, 3000);

  // if the future, may be better to stop timer upon page redirect so new
  // timers are not created every time the dashboard is loaded
  $scope.stopGameUpdate = function() {
    $interval.cancel(timer);
    $rootScope.creator = false;
    $state.go('tabs.welcome');
  }

});