angular.module('app.auth', [])

.controller('AuthController', function ($scope, $state, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('huntJWT', token);
        $state.go('tabs.welcome');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('huntJWT', token);
        $state.go('tabs.welcome');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
