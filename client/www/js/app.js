angular.module('app', ['ionic', 'app.routes', 'app.directives', 'app.services'])

.run(function($ionicPlatform, $rootScope, $state, LocalStorageService) {
  $rootScope.redirect = function(route) {
    $state.go(route);
  };

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