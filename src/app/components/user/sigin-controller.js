/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .controller('SignInCtrl', ['$scope', '$location', '$state', '$log', '$auth', '$window', 'userService', function ($scope,$location, $state, $log, $auth, $window, userService) {
    $scope.authenticate = function(provider) {
      $auth.link(provider).then(function (response){
        $auth.setToken(response);
        userService.isAdmin().then(function(isAdmin){
          $auth.admin=isAdmin;
          $window.sessionStorage.admin = isAdmin;
        });
        var toState = $window.sessionStorage.toState || 'home';
        $state.transitionTo(toState);
      });
    };

    $scope.logout = function(){
      $auth.logout();
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    if( $scope.isAuthenticated ){
      userService.isAdmin().then(function(isAdmin){
        $auth.admin=isAdmin;
        $window.sessionStorage.admin = isAdmin;
        var toState = $window.sessionStorage.toState || 'home';
        $state.transitionTo(toState);
      });
    }

  }]);
