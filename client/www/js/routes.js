angular.module('app.routes', ['app.preGameControllers',
  'app.inGameControllers',
  'app.createGameControllers',
  'app.services'])

// Test local storage
// .run(function(LocalStorageService) {

//   LocalStorageService.set('name', 'Max');
//   console.log(LocalStorageService.get('name'));
//   LocalStorageService.setObject('post', {
//     name: 'Thoughts',
//     text: 'Today was a good day'
//   });
//   var post = LocalStorageService.getObject('post');
//   console.log(post);
// })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(0);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // Templates are injected into <ion-nav-view> in index.html
  $stateProvider

    // parent state
    .state('tabs', {
      url: '/home',
      abstract:true,
      templateUrl: 'templates/tabs.html'  // substates of tabs need labeled views
    })

    // substate of tabs
    .state('tabs.welcome', {
      url: '/welcome', // relative to parent
      views: {
        'welcome': {
          templateUrl: 'templates/welcome.html',
          controller: 'welcomeCtrl'
        }
      }
    })

    // substate of tabs
    .state('tabs.about', {
      url: '/about',
      views: {
        'about': {
          templateUrl: 'templates/about.html',
          controller: 'aboutCtrl'
        }
      }
    })

    // Parent state
    .state('hunts', {
      abstract: true,
      url: '/hunts',
      template: '<ion-nav-view></ion-nav-view>'
    })

    // Substate of hunts
    .state('hunts.index', {
      url: '',  // relative to the hunts state URL
      templateUrl: 'templates/hunts.html',
      controller: 'huntsCtrl',
      resolve: {
        // injects hunts into controller, which puts it into $scope
        hunts: function(HuntService) {
          return HuntService.getHunts();
        }
      }
    })

    // Substate of hunts, show the details of one hunt
    .state('hunts.detail', {
      url: '/:hunt',   // :hunt is a param injected during ng-repeat in hunts.html
      templateUrl: 'templates/huntDetail.html',
      controller: 'huntDetailCtrl',
      // resolve is an object
      // key is the variable name that is injected into the controller
      // value is a value or promise that gets returned
      resolve: {
        // hunt function gets hunt URL using $stateParams,
        // calls getHunt with that params, and injects the value returned from getHunt
        // into the HuntDetailCtrl, so the controller can be linked to a specific hunt
        hunt: function($stateParams, HuntService) {
          return HuntService.getHunt($stateParams.hunt)
        }
      }
    })

    .state('joinGame', {
      url: '/join',
      templateUrl: 'templates/joinGame.html',
      controller: 'joinCtrl'
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

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
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

    .state('createChallenge', {
      url: '/createChallenge',
      templateUrl: 'templates/createChallenge.html',
      controller: 'createChallengeCtrl'
    })

    .state('createHunt', {
      url: '/createHunt',
      templateUrl: 'templates/createHunt.html',
      controller: 'createHuntCtrl'
    })

    .state('previewChallenge', {
      url: '/previewChallenge',
      templateUrl: 'templates/previewChallenge.html',
      controller: 'previewChallengeCtrl'
    })

    .state('previewHunt', {
      url: '/previewHunt',
      templateUrl: 'templates/previewHunt.html',
      controller: 'previewHuntCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/welcome');

});
