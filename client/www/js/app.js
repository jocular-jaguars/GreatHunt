angular.module('app', ['ionic',
  'app.routes',
  'app.services',
  'ngIOS9UIWebViewPatch'
  ])

.run(function($ionicPlatform, $rootScope, $state, LocalStorageService) {
  //allows for global access to changing views
  $rootScope.redirect = function(route) {
    console.log('going to ', route);
    $state.go(route);
  };

  //allows for ending game from multiple views
  $rootScope.endGame = function() {
    LocalStorageService.set("finished", true);
    $rootScope.redirect('tabs.welcome');
  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})