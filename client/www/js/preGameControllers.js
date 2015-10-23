angular.module('app.preGameControllers', ['app.services', 'ngResource'])

.controller('welcomeCtrl', function($scope) {

})

.controller('aboutCtrl', function($scope) {

})

.controller('huntsCtrl', function($scope, hunts) {
  $scope.hunts = hunts;
})


.controller('huntDetailCtrl', function($scope, hunt) {
  $scope.hunt = hunt;
})

.controller('lobbyCtrl', function($scope, $interval) {
  //fake data until we've made server call
  $scope.teams = [{name:'Jocular Jags', currentChallenge: '7'},
                  {name:'Marty McFly', currentChallenge: '3'},
                  {name:'Even Bigger Losers', currentChallenge: '4'}];

  $interval(function(){
    //This will work as soon as we can access the gameCode
    // $scope.teams = team.get(gameCode);
  }, 500);
})

.controller('creatorJoinCtrl', function($scope) {

})

.controller('joinCtrl', function($scope) {

})

.controller('createTeamCtrl', function($scope) {

});

