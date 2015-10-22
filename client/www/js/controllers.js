angular.module('app.controllers', ['app.services', 'ngResource'])

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
  $scope.teams = [{name:'Jocular Jags', currentChallenge: 'Challenge 7'},
                  {name:'Marty McFly', currentChallenge: 'Challenge 3'},
                  {name:'Even Bigger Losers', currentChallenge: 'Challenge 4'}];

  $interval(function(){
    //This will work as soon as we can access the gameCode
    // $scope.teams = team.get(gameCode);
  }, 500);
})

.controller('creatorJoinCtrl', function($scope) {

})

.controller('createTeamCtrl', function($scope) {

})

.controller('challengeCtrl', function($scope) {

  //fake data until we've made server call
  $scope.description = "Don't forget your towel!";
  $scope.question = '123';

})

.controller('endGameCtrl', function($scope) {

})

.controller('dashboardCtrl', function($scope, $interval, team) {
  //fake data until we've made server call
  $scope.teams = [{name:'Jocular Jags', currentChallenge: 'Challenge 7'},
                  {name:'Marty', currentChallenge: 'Challenge 3'},
                  {name:'Even Bigger Losers', currentChallenge: 'Challenge 4'}];

  $interval(function(){
    //This will work as soon as we can access the gameCode
    // $scope.teams = team.get(gameCode);

  }, 500);
});