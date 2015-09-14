'use strict';

angular.module('lct')
  .controller('NavbarCtrl', [ '$scope', '$location', '$state', '$auth', '$window', 'userService', function ($scope,$location, $state, $auth, $window, userService) {
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

    $scope.date = new Date();
    $scope.isActive = function (viewLocation) {
      //$log.debug('path ' + $location.path() +' ' + viewLocation + ' ' + ($location.path().startsWith(viewLocation)));
      return ($location.path() === '/' && viewLocation === '/') || (viewLocation !== '/' && $location.path().startsWith(viewLocation));
    };
  }]);
