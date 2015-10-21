angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // Templates are injected into <ion-nav-view> in index.html
  $stateProvider

    .state('tabs', {
      url: '/home',
      abstract:true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.welcome', {
      url: '/welcome',
      views: {
        'welcome': {
          templateUrl: 'templates/welcome.html',
          controller: 'welcomeCtrl'
        }
      }
    })

    .state('tabs.about', {
      url: '/about',
      views: {
        'about': {
          templateUrl: 'templates/about.html',
          controller: 'aboutCtrl'
        }
      }
    })

    .state('lobby', {
      url: '/lobby',
      templateUrl: 'templates/lobby.html',
      controller: 'lobbyCtrl'
    })

    .state('creatorJoin', {
      url: '/creatorjoin',
      templateUrl: 'templates/creatorJoin.html',
      controller: 'creatorJoinCtrl'
    })

    .state('createTeam', {
      url: '/createteam',
      templateUrl: 'templates/createTeam.html',
      controller: 'createTeamCtrl'
    })

    .state('challenge', {
      url: '/challenge',
      templateUrl: 'templates/challenge.html',
      controller: 'challengeCtrl'
    })

    .state('endGame', {
      url: '/end',
      templateUrl: 'templates/endGame.html',
      controller: 'endGameCtrl'
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
    })

    .state('correct', {
      url: '/correct',
      templateUrl: 'templates/correct.html',
      controller: 'correctCtrl'
    })

    .state('incorrect', {
      url: '/incorrect',
      templateUrl: 'templates/incorrect.html',
      controller: 'incorrectCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/welcome');

});