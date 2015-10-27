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


.controller('huntDetailCtrl', function($scope, hunt, GameService, $rootScope,
  LocalStorageService) {
  $scope.hunt = hunt;

  $scope.makeGame = function() {
    GameService.postGame(hunt.name).then(function(gameCode) {
      // $rootScope.gameCode = gameCode;
      LocalStorageService.set('gameCode', gameCode);
      // $rootScope.creator = true;
      LocalStorageService.set('creator', true);
      $rootScope.redirect('creatorJoin');
    })
  }
})

.controller('lobbyCtrl', function ($scope, $interval, $state, GameService,
   LocalStorageService, $rootScope) {

  $scope.gameCode = LocalStorageService.get('gameCode');

  var timer = $interval(function() {
    var gameCode = LocalStorageService.get('gameCode');
    GameService.getGame(gameCode).then(function(data) {
      // If server says game code is invalid
      if (data.gameNotFound) {
        // TODO: display this message on the lobby view
        console.log("Oops the game is not found. Restart the app");
      // If server says game has started
      } else if (data.started) {
        $scope.game = data;   // object with all game data
        console.log("game object: " + JSON.stringify($scope.game));
        // if game has started, then cancel timer and redirect to challenge state
        $interval.cancel(timer);
        $state.go('challenge');
      // If server says game has not started
      } else {
        $scope.teams = data.teams;  // this is an array
      }
    })
  }, 3000);

  $scope.isCreator = function() {
    return LocalStorageService.get('creator') || false;
  }

  $scope.startGame = function() {
    var gameCode = LocalStorageService.get('gameCode');
    //add update to server when server-side function available
    GameService.startGame(gameCode).then(function(started){
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
        // $rootScope.gameCode = $scope.data.gameCode;
        $rootScope.redirect('createTeam');
      }
    });
  }
})

.controller('createTeamCtrl', function($scope, $rootScope, TeamService,
  LocalStorageService) {
  $scope.data = {};
  //needs to push info to server

  $scope.sendTeam = function() {
    var gameCode = LocalStorageService.get('gameCode');
    TeamService.makeTeam($scope.data.teamName, gameCode).then(function(teamIndexObj) {
      LocalStorageService.set('teamIndex', teamIndexObj.teamIndex);
      // $rootScope.teamIndex = teamIndexObj.teamIndex;
      $rootScope.redirect('lobby');
    });
  }
});

