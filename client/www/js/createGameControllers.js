angular.module('app.createGameControllers', [])

.controller('createChallengeCtrl', function($scope) {
  $scope.addChallenge = function(challenge) {
    HuntService.createChallenge(challenge);
    $location.path('/previewHunt');
  };

})

.controller('createHuntCtrl', function($scope) {
  $scope.createHunt = function(hunt) {
    HuntService.createHunt(hunt);
    //now redirect to createChallenge page
    $location.path('/createChallenge');
  }

})

//Not necessary for MVP
.controller('previewChallengeCtrl', function($scope) {

})

.controller('previewHuntCtrl', function($scope) {
  $scope.addHunt = function(hunt) {
    HuntService.addHunt(hunt);
    $location.path('/hunts');
  }
  $scope.newChallenge = function() {
    $location.path('/createChallenge');
  }
})
