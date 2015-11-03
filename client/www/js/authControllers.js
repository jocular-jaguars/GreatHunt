angular.module('app.authControllers', ['app.services'])

.controller('authCtrl', function ($scope, $state, $window, Auth) {
  $scope.user = {};

  $scope.signIn = function () {
    Auth.signIn($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('huntJWT', token);
        $state.go('tabs.welcome');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signUp = function () {
    Auth.signUp($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('huntJWT', token);
        $state.go('tabs.welcome');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});