'use strict';

angular.module('lct')
  .controller('NavbarCtrl', function ($scope,$location, $state, $auth) {
    $scope.logout = function(){
      $auth.logout();
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    $scope.username = function(){
      if( $auth.isAuthenticated() ) {
        return $auth.getPayload().sub;
      }else{
        return "";
      }
    };
    $scope.date = new Date();
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
