angular.module('app.createGameControllers', ['app.services', 'ngResource'])

.controller('createChallengeCtrl', function($scope, $state, HuntService, $http, LocalStorageService) {
  $scope.challenge = {};

  $scope.isValidChallenge = function() {

    return $scope.challenge.description !== ''
      && $scope.challenge.question !== ''
      && $scope.challenge.answers !== ''
      && $scope.challenge.pictureURL !== undefined;
  }

  $scope.addChallenge = function(challenge) {
    console.log('add challenge is getting input: ', challenge);
    HuntService.addChallenge(challenge);

    //will be an array of challenge objects
    var challengeArray = [];
    var huntName = LocalStorageService.get('newHuntName');
    var challengeObject = { huntName: huntName.name, challenge: challenge };
    var storedChallenges = LocalStorageService.get('newChallenges');

    if (storedChallenges === null) {
      challengeArray.push(challengeObject);
      LocalStorageService.set('newChallenges', challengeArray);
    } else {
      challengeArray = storedChallenges;
      challengeArray.push(challengeObject);
      LocalStorageService.set('newChallenges', challengeArray);
    }
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

.controller('createHuntCtrl', function($scope, HuntService, $state, $http, LocalStorageService) {
  $scope.createHunt = function(hunt) {
    // Creates a hunt in the services
    HuntService.createHunt(hunt);
    //need to save the newHuntName on LocalStorage
    LocalStorageService.set('newHuntName', hunt);
    //now redirect to createChallenge page
    $state.go('createChallenge');
  }

})

.controller('previewChallengeCtrl', function($scope, LocalStorageService) {

})

.controller('previewHuntCtrl', function($scope, $state, HuntService, LocalStorageService) {
  $scope.hunt = LocalStorageService.get('newHuntName');

  var setChallenges = function() {
    var allChallenges = LocalStorageService.get('newChallenges');
    var displayChallenges = [];
    for (var i=0; i<allChallenges.length; i++) {
      if (allChallenges[i].huntName === $scope.hunt.name) {
        console.log("Looping through allChallenges: ",allChallenges[i]);
        displayChallenges.push(allChallenges[i].challenge);
      }
    };
    $scope.challenges = displayChallenges;
  }();

  console.log("The scope challenges are: ",$scope.challenges);

  $scope.addHunt = function() {
    LocalStorageService.set('newChallenges', null);
    HuntService.addHuntToDatabase()
      .then(function(res) {
        console.log('res in createGameControllers: ', res);
        //$state.go('hunts.index'); //different routing idea for UI/UX
        $state.go('tabs.welcome');
      });
  };

  $scope.newChallenge = function() {
    $state.go('createChallenge');
  }
})
