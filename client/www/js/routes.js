angular.module('app.routes', ['app.authControllers', 'app.preGameControllers',
  'app.inGameControllers',
  'app.createGameControllers',
  'app.services'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,
  $httpProvider) {

  $ionicConfigProvider.views.maxCache(0);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // Templates are injected into <ion-nav-view> in index.html
  $stateProvider
    //login routes
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'authCtrl',
      data: {
        authenticate: false
      }
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'authCtrl',
      data: {
        authenticate: false
      }
    })

    // parent state
    .state('tabs', {
      url: '/home',
      abstract:true,
      templateUrl: 'templates/tabs.html',  // substates of tabs need labeled views
      data: {
        authenticate: false
      }
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
      template: '<ion-nav-view></ion-nav-view>',
      data: {
        authenticate: false
      }
    })

    // Substate of hunts
    .state('hunts.index', {
      url: '',  // relative to the hunts state URL
      templateUrl: 'templates/hunts.html',
      controller: 'huntsCtrl',
      data: {
        authenticate: false
      },
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
      data: {
        authenticate: false
      },
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
      controller: 'joinCtrl',
      data: {
        authenticate: false
      }
    })

    .state('lobby', {
      url: '/lobby',
      templateUrl: 'templates/lobby.html',
      controller: 'lobbyCtrl',
      data: {
        authenticate: false
      }
    })

    .state('creatorJoin', {
      url: '/creatorjoin',
      templateUrl: 'templates/creatorJoin.html',
      controller: 'creatorJoinCtrl',
      data: {
        authenticate: false
      }
    })

    .state('createTeam', {
      url: '/createteam',
      templateUrl: 'templates/createTeam.html',
      controller: 'createTeamCtrl',
      data: {
        authenticate: false
      }
    })

    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl',
      data: {
        authenticate: false
      }
    })

    .state('challenge', {
      url: '/challenge',
      templateUrl: 'templates/challenge.html',
      controller: 'challengeCtrl',
      data: {
        authenticate: false
      }
    })

    .state('endGame', {
      url: '/end',
      templateUrl: 'templates/endGame.html',
      controller: 'endGameCtrl',
      data: {
        authenticate: false
      }
    })

    .state('createChallenge', {
      url: '/createChallenge',
      templateUrl: 'templates/createChallenge.html',
      controller: 'createChallengeCtrl',
      data: {
        authenticate: true
      }
    })

    .state('createHunt', {
      url: '/createHunt',
      templateUrl: 'templates/createHunt.html',
      controller: 'createHuntCtrl',
      data: {
        authenticate: true
      }
    })

    .state('previewChallenge', {
      url: '/previewChallenge',
      templateUrl: 'templates/previewChallenge.html',
      controller: 'previewChallengeCtrl',
      data: {
        authenticate: true
      }
    })

    .state('previewHunt', {
      url: '/previewHunt',
      templateUrl: 'templates/previewHunt.html',
      controller: 'previewHuntCtrl',
      data: {
        authenticate: true
      }
    })

    .state('leaderboard', {
      url: '/leaderboard',
      templateUrl: 'templates/leaderboard.html',
      controller: 'leaderboardCtrl',
      data: {
        authenticate: false
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/welcome');

  // Add AttachTokens to the array of interceptors
  $httpProvider.interceptors.push('AttachTokens');

})

// $httpInterceptor that stops all out-going requests and adds token from localStorage
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('huntJWT');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function ($rootScope, $state, Auth) {
  // when route changes, look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams,
    fromState, fromParams) {
    // If route requires authentication and user is not authenticated
    if (toState.data.authenticate && !Auth.isAuth()) {
      event.preventDefault();
      console.log("can't go there");
      $state.go('tabs.welcome');
    }
  });

});