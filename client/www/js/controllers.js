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

.controller('lobbyCtrl', function($scope) {

  //fake data until we've made server call
  $scope.teams = ['Jocular Jags', 'Losers', 'Major Losers'];

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
  $scope.teams = ['Jocular Jags', 'Losers', 'Major Losers'];
  $scope.challenges = ['Challenge 7', 'Challenge 3', 'Challenge 4'];

  $interval(function(){
    //instead we will be calling server for information, but
    //this is just for testing for now
    $scope.teams.push('Fourth Team!')
  }, 750);

  // $interval(function(){
  //   var teams = team.get();
  //   // don't know what this is called yet (something like...)
  //   // $scope.teams = teams.teamNames
  //   // $scope.challenges = teams.challenges
  // }, 500);
});