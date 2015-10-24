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
    GameService.getGame().then(function(data) {
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

})

.controller('creatorJoinCtrl', function($scope) {

})

.controller('joinCtrl', function($scope) {

})

.controller('createTeamCtrl', function($scope) {
  //needs to push info to server


});

