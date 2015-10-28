angular.module('app.inGameControllers', ['app.services', 'ngResource'])

.controller('challengeCtrl', function($scope, $rootScope, LocalStorageService) {

  $scope.huntName = LocalStorageService.get("huntName");

  // Index of the current challenge (zero-based)
  $scope.currentIndex = LocalStorageService.get("currentChallenge");
  // All the challenges
  $scope.challenges = LocalStorageService.get("challenges");
  // The current challenge
  $scope.challenge = $scope.challenges[$scope.currentIndex];
  // User input
  $scope.user = {};
  $scope.user.answer = "";

  // Move to next challenge or end the game
  $scope.moveToNext = function() {
    // Clear user input on the form
    $scope.user.answer = "";
    // Update server on the player's current challenge
    console.log("updated the server!");

    // Send user to end game view if completed last challenge
    if ($scope.currentIndex === $scope.challenges.length - 1) {
      $rootScope.redirect('endGame');
    // Otherwise, move to next challenge and save position to localStorage
    } else {
      $scope.currentIndex++;
      LocalStorageService.set("currentChallenge", $scope.currentIndex);
      $scope.challenge = $scope.challenges[$scope.currentIndex];
    }
  }

  // Check if user input answer is wrong
  $scope.isWrong = function() {
    var isWrong = true;
    var answers = $scope.challenge.answers;

    // Check if input is equal to any of the answers
    for (var i = 0; i < answers.length; i++) {
      if ($scope.user.answer === answers[i]) {
        isWrong = false;
        break;
      }
    }
    return isWrong;
  }
})

.controller('endGameCtrl', function($scope) {
  // TODO: CLEAR THE GAME FROM LOCAL STORAGE???
})

.controller('dashboardCtrl', function ($scope, $rootScope, $interval, $state,
  TeamService, LocalStorageService) {

  $scope.gameCode = LocalStorageService.get('gameCode');

  // Keep getting updated team info from server
  var timer = $interval(function() {
    TeamService.getTeams($scope.gameCode).then(function(teams) {
      $scope.teams = teams;
    })
  }, 3000);

  // if the future, may be better to stop timer upon page redirect so new
  // timers are not created every time the dashboard is loaded
  $scope.stopGameUpdate = function() {
    $interval.cancel(timer);
    LocalStorageService.set('creator', false);
    $state.go('tabs.welcome');
  }
});