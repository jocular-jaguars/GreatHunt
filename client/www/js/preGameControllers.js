angular.module('app.preGameControllers', ['app.services', 'ngResource'])
//routes for the redirect MUST be in single quotes

.controller('welcomeCtrl', function($scope, $rootScope, LocalStorageService) {

  // Reset the game if player has not registered yet or is finished
  if (!LocalStorageService.get('registered') || LocalStorageService.get('finished')) {
    LocalStorageService.deleteAll();
  }

  // If view from previous session is saved, go to it
  if (LocalStorageService.get('currentView')) {
    $rootScope.redirect(LocalStorageService.get('currentView'));
  }

  $scope.create = function() {
    $rootScope.redirect('hunts.index');
  };

})

.controller('aboutCtrl', function($scope) {

})

.controller('huntsCtrl', function($scope, hunts) {
  $scope.hunts = hunts;
})

.controller('huntDetailCtrl', function($scope, hunt, GameService, $rootScope,
  LocalStorageService) {
  $scope.hunt = hunt;

  // Creator joins a game
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

  console.log("entered lobbyCtrl");
  // Set flag that user has registered a team on the server
  LocalStorageService.set('registered', true);

  // Remember lobby view so user can return after closing the app
  LocalStorageService.set('currentView', 'lobby');

  $scope.gameCode = LocalStorageService.get('gameCode');

  // Keep checking server for game start
  // TODO: cancel timer on leaving the view or change to setTimeOut
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

  // Player joins a game
  $scope.joinGame = function() {
    GameService.getGame($scope.data.gameCode).then(function(data) {
      if (data.gameNotFound) {
        $scope.invalid = true;  // server says game code is invalid
        $scope.data.gameCode = '';  // clear the input field
      } else {
        $scope.invalid = false;
        LocalStorageService.set('gameCode', $scope.data.gameCode);
        LocalStorageService.set('creator', false);
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
      $scope.data.teamName = "";
      $rootScope.redirect('lobby');
    });
  }
});

