angular.module('app.controllers', [])

.controller('welcomeCtrl', function($scope) {

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

.controller('dashboardCtrl', function($scope) {

});