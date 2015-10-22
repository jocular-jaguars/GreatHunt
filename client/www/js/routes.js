angular.module('app.routes', ['app.controllers', 'app.services'])

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
      templateUrl: 'templates/tabs.html'  // substates of tabs need labeled views
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

    // An abstract state
    .state('hunts', {
      abstract: true,
      url: '/hunts',
      template: '<ion-nav-view></ion-nav-view>'
    })

    // Substates of hunts state
    .state('hunts.index', {
      url: '',  // relative to the hunts state URL
      templateUrl: 'templates/hunts.html',
      controller: 'huntsCtrl',
      resolve: {
        hunts: function(HuntService) {
          return HuntService.getHunts();
        }
      }
    })

    // Show the details of one hunt
    .state('hunts.detail', {
      url: '/:hunt',   // :hunt is a param injected during ng-repeat in hunts.html
      templateUrl: 'templates/huntDetail.html',
      controller: 'huntDetailCtrl',
      // resolve is an object
      // key is the variable name that is injected into the controller
      // value is a value or promise that gets returned
      resolve: {
        // hunt function gets hunt URL with help of $stateParams,
        // calls getHunt with that params, and injects the value returned from getHunt
        // into the HuntDetailCtrl, so the controller can be linked to a specific hunt
        hunt: function($stateParams, HuntService) {
          return HuntService.getHunt($stateParams.hunt)
        }
      }
    })

    .state('joinGame', {
      url: '/join',
      templateUrl: 'templates/joinGame.html'
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
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/welcome');

});