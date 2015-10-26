angular.module('app.createGameControllers', [])

.controller('createChallengeCtrl', function($scope) {
  $scope.addChallenge = function(challenge) {
    HuntService.createChallenge(challenge);
    $location.path('/previewHunt');
  };

  
  Parse.initialize(parse_app_id, parse_javascript_id);

  $scope.imageUrl;

  $scope.uploadPhoto = function() {
    var file = document.getElementById("photo").files[0];
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    parseFile.save().then(function() {
      console.log(parseFile.url());
      $scope.imageUrl = parseFile.url();
      $scope.$apply();
    }, function(err) {
      console.log(err);
    });
  }

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
