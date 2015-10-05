'use strict';

angular.module('lct')
  .directive('navbar', [ '$location', '$state', '$auth', '$window', 'userService', function ($location, $state, $auth, $window, userService) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/navbar/navbar.html',
      controller: function($scope){
        $scope.logout = function(){
          $auth.logout();
        };
        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };
        if( $auth.isAuthenticated() ) {
          $scope.username = $auth.getPayload().sub;
          userService.isAdmin().then(function(result){
            $scope.isAdmin = result;
          });
        }
        $scope.isActive = function (viewLocation) {
          return ($location.path() === '/' && viewLocation === '/') || (viewLocation !== '/' && $location.path().startsWith(viewLocation));
        };
      }
    };
  }]);
