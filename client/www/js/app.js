angular.module('app', ['ionic', 'app.routes', 'app.directives', 'app.services'])

.run(function($ionicPlatform, $rootScope, $state, LocalStorageService) {
  $rootScope.redirect = function(route) {
    $state.go(route);
  };
  // When app starts, set creator flag to false if it's absent (which means
  // this is a new game)
  if (LocalStorageService.get('creator') === null) {
    LocalStorageService.set('creator', false);
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