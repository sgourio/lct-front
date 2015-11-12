'use strict';

angular.module('lct')
  .directive('navbar', [ '$location', '$state', '$auth', function ($location, $state, $auth) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/navbar/navbar.html',
      controller: function($scope){
        $scope.auth = $auth;

        $scope.logout = function(){
          $auth.logout();
        };
        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };


        $scope.isActive = function (viewLocation) {
          return ($location.path() === '/' && viewLocation === '/') || (viewLocation !== '/' && $location.path().startsWith(viewLocation));
        };

      }
    };
  }]);
