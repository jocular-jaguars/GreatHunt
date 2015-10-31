angular.module('app.inGameControllers', ['app.services', 'ngResource'])

.controller('challengeCtrl', function($scope, $rootScope, $interval, LocalStorageService,
  TeamService) {
  //used in clock. Just instantiated once.
  var now;

  // Remember challenge view so user can return after closing the app
  LocalStorageService.set('currentView', 'challenge');

  $scope.huntName = LocalStorageService.get("huntName");
  $scope.gameCode = LocalStorageService.get("gameCode");
  $scope.teamIndex = LocalStorageService.get("teamIndex");
  $scope.startTime = LocalStorageService.get("startTime");

  // Index of the current challenge (zero-based)
  $scope.currentIndex = LocalStorageService.get("currentChallenge");
  // All the challenges
  $scope.challenges = LocalStorageService.get("challenges");

  // The current challenge
  $scope.challenge = $scope.challenges[$scope.currentIndex];
  // User input
  $scope.user = {};
  $scope.user.answer = "";

  var clock = $interval(function(){
    //note that this is in milliseconds
    now = Date.now();
    $scope.minutes = Math.floor((now - $scope.startTime)/60000);
    $scope.seconds = Math.floor((now - $scope.startTime)/1000) - $scope.minutes*60;
    //
  }, 1000);

  // Move to next challenge or end the game
  $scope.moveToNext = function() {
    // Clear user input on the form
    $scope.user.answer = "";
    // Update server on the player's current challenge
    TeamService.updateTeam($scope.teamIndex, $scope.gameCode).then(function(updated){
      if (!updated) {
        console.log('No response from server');
      }
    });

    // Send user to end game view if completed last challenge
    if ($scope.currentIndex === $scope.challenges.length - 1) {
      $interval.cancel(clock);
      TeamService.updateTeam($scope.teamIndex, $scope.gameCode).then(function(update){
        if (updated) {
          $rootScope.redirect('leaderboard');
        } else {
          console.log('No response from server. Can\'t allow redirect!');
        }
      });
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

.controller('dashboardCtrl', function ($scope, $rootScope, $interval, $state,
  TeamService, GameService, LocalStorageService) {

  $scope.started = LocalStorageService.get('started');
  LocalStorageService.set('registered', true);

  // Remember dashboard view so user can return after closing the app
  LocalStorageService.set('currentView', 'dashboard');

  $scope.gameCode = LocalStorageService.get('gameCode');

  // Keep getting updated team info from server
  var timer = $interval(function() {
    TeamService.getTeams($scope.gameCode).then(function(teams) {
      $scope.teams = teams.sort(compareChallenge);
    })
  }, 5000);

  // Sort teams by descending current challenge
  function compareChallenge(a, b) {
    if (a.currentChallenge < b.currentChallenge) {
      return 1;
    }
    if (a.currentChallenge > b.currentChallenge) {
      return -1;
    }
    return 0;
  }

  // Creator tells server to start game
  $scope.startGame = function() {
    //add update to server when server-side function available
    GameService.startGame($scope.gameCode).then(function(started) {
      $scope.started = true;
      LocalStorageService.set('started', true);
      if (!started) {
        console.log('No response from server');
      }
    });
  }

  // if the future, may be better to stop timer upon page redirect so new
  // timers are not created every time the dashboard is loaded
  $scope.stopGameUpdate = function() {
    $interval.cancel(timer);
    LocalStorageService.delete('registered');
    $state.go('tabs.welcome');
  }
})

.controller('leaderboardCtrl', function($scope, $rootScope, TeamService, LocalStorageService) {
  //This will only be shown when the game is ended, so no interval needed.
  $scope.gameCode = LocalStorageService.get('gameCode'); //later grab this from LocalStorage
  $scope.teamInfo = {};

  var ranks = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth",
    7: "Seventh",
    8: "Eight",
    9: "Ninth",
    10: "Tenth",
    11: "Eleventh",
    12: "Twelfth"
  }

  var setTeamsArray = function() {
    TeamService.getTeams($scope.gameCode).then(function(teams) {
      //for now, sorting the same way as dashboard (til we have time info)
      $scope.teams = teams.sort(compareChallenge);
      for (var i=0; i<$scope.teams.length; i++) {
        $scope.teamInfo[i] = {name: $scope.teams[i].name, place: ranks[i+1] + " place"};
      }
      console.log('team info: ', $scope.teamInfo);
    })
  };

  function compareChallenge(a, b) {
    if (a.currentChallenge < b.currentChallenge) {
      return 1;
    }
    if (a.currentChallenge > b.currentChallenge) {
      return -1;
    }
    return 0;
  }

  $scope.endGame = function() {
    LocalStorageService.set("finished", true);
    $rootScope.endGame();
  }

  //calling the setTeams on initialization of this controller
  setTeamsArray();
});