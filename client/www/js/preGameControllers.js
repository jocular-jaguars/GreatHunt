angular.module('app.preGameControllers', ['app.services', 'ngResource'])
//routes for the redirect MUST be in single quotes

.controller('welcomeCtrl', function($scope, $rootScope, LocalStorageService) {
  $scope.create = function() {
    $rootScope.redirect('hunts.index');
  };

  // Reset the game if player is no longer playing
  if (LocalStorageService.get('finished')) {
    // TODO: make a function in local storage service to delete stuff
    console.log("clearing the local Storage");
  }

})

.controller('aboutCtrl', function($scope) {

})

.controller('huntsCtrl', function($scope, hunts) {
  $scope.hunts = hunts;
})


.controller('huntDetailCtrl', function($scope, hunt, GameService, $rootScope,
  LocalStorageService) {
  $scope.hunt = hunt;

  $scope.makeGame = function() {
    GameService.postGame(hunt.name).then(function(gameCode) {
      LocalStorageService.set('gameCode', gameCode);
      LocalStorageService.set('creator', true);
      $rootScope.redirect('creatorJoin');
    })
  }
})

.controller('lobbyCtrl', function ($scope, $rootScope, $interval, $state,
  GameService, LocalStorageService) {

  $scope.gameCode = LocalStorageService.get('gameCode');

  // Keep checking server for game start
  var timer = $interval(function() {
    GameService.getGame($scope.gameCode).then(function(data) {
      // If server says game code is invalid
      if (data.gameNotFound) {
        // TODO: display this message on the lobby view
        console.log("Oops the game is not found. Restart the app");
      // If server says game has started
      } else if (data.started) {
        // Save game to localStorage
        $scope.saveGameToLocal(data);
        // Cancel timer and redirect to challenge state
        $interval.cancel(timer);
        $state.go('challenge');
      // If server says game has not started
      } else {
        $scope.teams = data.teams;  // array of all the teams
      }
    })
  }, 1000);

  $scope.isCreator = function() {
    return LocalStorageService.get('creator') || false;
  }

  // Saves the game object from server to localStorage
  $scope.saveGameToLocal = function(gameObj) {
    LocalStorageService.set('huntName', gameObj.name);
    LocalStorageService.set('huntDescription', gameObj.description);
    LocalStorageService.set('started', gameObj.started);
    LocalStorageService.set('finished', gameObj.finished);
    LocalStorageService.set('challenges', gameObj.challenges); // array
    LocalStorageService.set('currentChallenge', 0) // new game starts at 0
  }

  // Creator tells server to start game
  $scope.startGame = function() {
    //add update to server when server-side function available
    GameService.startGame($scope.gameCode).then(function(started){
      if (!started) {
        console.log('No response from server');
      }
    });
  }
})

.controller('creatorJoinCtrl', function($scope, LocalStorageService) {
  $scope.gameCode = LocalStorageService.get('gameCode');
})

.controller('joinCtrl', function($scope, GameService, $rootScope,
  LocalStorageService) {
  $scope.data = {};
  $scope.invalid = false; // game code is considered valid at the beginning

  $scope.joinGame = function() {
    GameService.getGame($scope.data.gameCode).then(function(data) {
      if (data.gameNotFound) {
        $scope.invalid = true;  // server says game code is invalid
        $scope.data.gameCode = '';  // clear the input field
      } else {
        $scope.invalid = false;
        LocalStorageService.set('gameCode', $scope.data.gameCode)
        $rootScope.redirect('createTeam');
      }
    });
  }
})

.controller('createTeamCtrl', function($scope, $rootScope, TeamService,
  LocalStorageService) {
  $scope.data = {};

  $scope.sendTeam = function() {
    var gameCode = LocalStorageService.get('gameCode');
    TeamService.makeTeam($scope.data.teamName, gameCode).then(function(teamIndexObj) {
      LocalStorageService.set('teamIndex', teamIndexObj.teamIndex);
      $rootScope.redirect('lobby');
    });
  }
});

