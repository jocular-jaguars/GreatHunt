angular.module('app.preGameControllers', ['app.services', 'ngResource'])
//routes for the redirect MUST be in single quotes

.controller('welcomeCtrl', function($scope, $rootScope) {
  $scope.create = function() {
    $rootScope.redirect('hunts.index');
  };

})

.controller('aboutCtrl', function($scope) {

})

.controller('huntsCtrl', function($scope, hunts) {
  $scope.hunts = hunts;
})


.controller('huntDetailCtrl', function($scope, hunt, GameService, $rootScope) {
  $scope.hunt = hunt;

  $scope.makeGame = function() {
    GameService.postGame(hunt.name).then(function(gameCode) {
      // save to local storage later
      $rootScope.gameCode = gameCode;
      $rootScope.creator = true;
      $rootScope.redirect('creatorJoin');
    })
  }
})

.controller('lobbyCtrl', function ($scope, $interval, $state, GameService, $rootScope) {

  var timer = $interval(function() {
    GameService.getGame($rootScope.gameCode).then(function(data) {
      if (data.started) {
        $scope.game = data;   // object with all game data
        console.log("game object: " + JSON.stringify($scope.game));
        // if game has started, then cancel timer and redirect to challenge state
        $interval.cancel(timer);
        $state.go('challenge');
      } else {
        $scope.teams = data.teams;  // this is an array
      }
    })
  }, 3000);

  $scope.isCreator = function() {
    return $rootScope.creator;
  }

  $scope.startGame = function() {
    //add update to server when server-side function available
    GameService.startGame($rootScope.gameCode).then(function(started){
      if (!started) {
        console.log('No response from server');
      }
    });
  }

})

.controller('creatorJoinCtrl', function($scope) {

})

.controller('joinCtrl', function($scope, GameService, $rootScope) {
  $scope.data = {};
  $scope.invalid = false; // game code is considered valid at the beginning

  $scope.joinGame = function() {
    GameService.getGame($scope.data.gameCode).then(function(data) {
      if (data.gameNotFound) {
        $scope.invalid = true;  // server says game code is invalid
        $scope.data.gameCode = '';  // clear the input field
      } else {
        $scope.invalid = false;
        $rootScope.gameCode = $scope.data.gameCode;
        $rootScope.redirect('createTeam');
      }
    });
  }
})

.controller('createTeamCtrl', function($scope, $rootScope, TeamService) {
  $scope.data = {};
  //needs to push info to server

  $scope.sendTeam = function() {
    TeamService.makeTeam($scope.data.teamName, $rootScope.gameCode).then(function(teamIndexObj) {
      $rootScope.teamIndex = teamIndexObj.teamIndex;
      $rootScope.redirect('lobby');
    });
  }
});

