angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // Templates are injected into <ion-nav-view> in index.html
  $stateProvider

    .state('tabs', {
      url: '/page10',
      abstract:true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.welcome', {
      url: '/page1',
      views: {
        'tab1': {
          templateUrl: 'templates/welcome.html',
          controller: 'welcomeCtrl'
        }
      }
    })

    .state('tabs.about', {
      url: '/page14',
      views: {
        'tab2': {
          templateUrl: 'templates/about.html',
          controller: 'aboutCtrl'
        }
      }
    })

    .state('lobby', {
      url: '/page2',
      templateUrl: 'templates/lobby.html',
      controller: 'lobbyCtrl'
    })

    .state('creatorLobby', {
      url: '/page3',
      templateUrl: 'templates/creatorLobby.html',
      controller: 'creatorLobbyCtrl'
    })

    .state('creatorParticipation', {
      url: '/page4',
      templateUrl: 'templates/creatorParticipation.html',
      controller: 'creatorParticipationCtrl'
    })

    .state('teamForm', {
      url: '/page5',
      templateUrl: 'templates/teamForm.html',
      controller: 'teamFormCtrl'
    })

    .state('challenge', {
      url: '/page6',
      templateUrl: 'templates/challenge.html',
      controller: 'challengeCtrl'
    })

    .state('challengeCorrect', {
      url: '/page7',
      templateUrl: 'templates/challengeCorrect.html',
      controller: 'challengeCorrectCtrl'
    })

    .state('challengeIncorrect', {
      url: '/page8',
      templateUrl: 'templates/challengeIncorrect.html',
      controller: 'challengeIncorrectCtrl'
    })

    .state('endGame', {
      url: '/page9',
      templateUrl: 'templates/endGame.html',
      controller: 'endGameCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page10/page1');

});