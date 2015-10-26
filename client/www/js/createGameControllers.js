angular.module('app.createGameControllers', ['app.services', 'ngResource'])

.controller('createChallengeCtrl', function($scope) {
  $scope.addChallenge = function(challenge) {
    HuntService.createChallenge(challenge);
    $location.path('/previewHunt');
  };

  // temporary API keys for testing, actual keys are different in deployment
  var parse_app_id = "JCeUbGW5rVcjhAHE2j48bLIitQ9jimFyYWiCXWdm";
  var parse_javascript_id = "nIIm7tUA6XGnBq3GIMj9DMxgHqiUQMRlKM2zR8Lk";

  Parse.initialize(parse_app_id, parse_javascript_id);

  $scope.imageUrl;

  $scope.uploadPhoto = function() {
    var file = document.getElementById("photo").files[0];
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    parseFile.save().then(function() {
      console.log(parseFile.url());
      $scope.imageUrl = parseFile.url();
      $scope.$apply()
    }, function(err) {
      console.log(err);
    });
  }

})

.controller('createHuntCtrl', function($scope, HuntService, $state) {
  $scope.createHunt = function(hunt) {
    $scope.hunt = hunt;
    HuntService.createHunt(hunt);
    //now redirect to createChallenge page
    $state.go('createChallenge');
    // $location.path('/createChallenge');
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
