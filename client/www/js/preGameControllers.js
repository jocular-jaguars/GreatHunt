angular.module('app.preGameControllers', ['app.services', 'ngResource'])
//routes for the redirect MUST be in single quotes

.controller('welcomeCtrl', function($rootScope, $scope) {

})

.controller('aboutCtrl', function($scope) {

})

.controller('huntsCtrl', function($scope, hunts) {
  $scope.hunts = hunts;
})


.controller('huntDetailCtrl', function($scope, hunt) {
  $scope.hunt = hunt;
})

.controller('lobbyCtrl', function ($scope, $interval, $state, GameService) {

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
})

.controller('creatorJoinCtrl', function($scope, $rootScope) {

})

.controller('joinCtrl', function($scope) {

})

.controller('createTeamCtrl', function($scope, $rootScope) {
  //needs to push info to server


});

