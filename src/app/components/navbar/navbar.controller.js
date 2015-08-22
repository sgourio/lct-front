'use strict';

angular.module('lct')
  .controller('NavbarCtrl', [ '$scope', '$location', '$state', '$auth', '$window', function ($scope,$location, $state, $auth, $window) {
    $scope.logout = function(){
      $auth.logout();
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.isAdmin = function(){
      return $auth.admin || $window.sessionStorage.admin;
    };
    $scope.username = function(){
      if( $auth.isAuthenticated() ) {
        return $auth.getPayload().sub;
      }else{
        return '';
      }
    };
    $scope.date = new Date();
    $scope.isActive = function (viewLocation) {
      //$log.debug('path ' + $location.path() +' ' + viewLocation + ' ' + ($location.path().startsWith(viewLocation)));
      return ($location.path() === '/' && viewLocation === '/') || (viewLocation !== '/' && $location.path().startsWith(viewLocation));
    };
  }]);
