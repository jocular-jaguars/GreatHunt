angular.module('app.createGameControllers', ['app.services', 'ngResource'])

.controller('createChallengeCtrl', function($scope, $state, HuntService, $http) {
  $scope.challenge = {};

  $scope.addChallenge = function(challenge) {
    HuntService.addChallenge(challenge);
  };

  // temporary API keys for testing, actual keys are different in deployment
  var parse_app_id = "JCeUbGW5rVcjhAHE2j48bLIitQ9jimFyYWiCXWdm";
  var parse_javascript_id = "nIIm7tUA6XGnBq3GIMj9DMxgHqiUQMRlKM2zR8Lk";

  Parse.initialize(parse_app_id, parse_javascript_id);

  $scope.uploadPhoto = function() {
    var file = document.getElementById("photo").files[0];
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    parseFile.save().then(function() {
      $scope.challenge.pictureURL = parseFile.url();
      $scope.$apply()
    }, function(err) {
      console.log(err);
    });
  }

})

.controller('createHuntCtrl', function($scope, HuntService, $state, $http) {
  $scope.createHunt = function(hunt) {
    HuntService.createHunt(hunt);
    //now redirect to createChallenge page
    $state.go('createChallenge');
  }

})

//Not necessary for MVP
.controller('previewChallengeCtrl', function($scope) {

})

.controller('previewHuntCtrl', function($scope, $state, HuntService) {
  $scope.addHunt = function() {
    HuntService.addHuntToDatabase()
      .then(function(res) {
        console.log('res in createGameControllers: ', res);
        $state.go('hunts.index');
      });
  }
  $scope.newChallenge = function() {
    $state.go('createChallenge'); 
  }
})
