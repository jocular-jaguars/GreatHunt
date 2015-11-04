angular.module('app.authControllers', ['app.services'])

.controller('authCtrl', function ($scope, $state, $window, Auth) {
  $scope.user = {};
  $scope.invalid = false;  // input is considered valid in the beginning

  $scope.signIn = function () {
    Auth.signIn($scope.user)
      .then(function (token) {
        $scope.invalid = false;
        $window.localStorage.setItem('huntJWT', token);
        $state.go('tabs.welcome');
      })
      .catch(function (error) {
        console.error(error);
        // clear the user
        $scope.user = {};
        // Input is invalid
        $scope.invalid = true;

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