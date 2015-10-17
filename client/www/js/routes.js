angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // Templates are injected into <ion-nav-view> in index.html
  $stateProvider

    .state('tabsController.welcome', {
      url: '/page1',
      views: {
        'tab1': {
          templateUrl: 'templates/welcome.html',
          controller: 'welcomeCtrl'
        }
      }
    })

    .state('waitingForUsers', {
      url: '/page2',
      templateUrl: 'templates/waitingForUsers.html',
      controller: 'waitingForUsersCtrl'
    })

    .state('startGame', {
      url: '/page3',
      templateUrl: 'templates/startGame.html',
      controller: 'startGameCtrl'
    })

    .state('startGamePopUp1', {
      url: '/page4',
      templateUrl: 'templates/startGamePopUp1.html',
      controller: 'startGamePopUp1Ctrl'
    })

    .state('startGamePopUp2', {
      url: '/page5',
      templateUrl: 'templates/startGamePopUp2.html',
      controller: 'startGamePopUp2Ctrl'
    })

    .state('clueScreen', {
      url: '/page6',
      templateUrl: 'templates/clueScreen.html',
      controller: 'clueScreenCtrl'
    })

    .state('correct:NextClue', {
      url: '/page7',
      templateUrl: 'templates/correct:NextClue.html',
      controller: 'correct:NextClueCtrl'
    })

    .state('incorrect', {
      url: '/page8',
      templateUrl: 'templates/incorrect.html',
      controller: 'incorrectCtrl'
    })

    .state('endGame', {
      url: '/page9',
      templateUrl: 'templates/endGame.html',
      controller: 'endGameCtrl'
    })

    .state('tabsController', {
      url: '/page10',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })

    .state('tabsController.about/Contact', {
      url: '/page14',
      views: {
        'tab2': {
          templateUrl: 'templates/about/Contact.html',
          controller: 'about/ContactCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page10/page1');

});