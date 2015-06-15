/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .controller('SignInCtrl', function ($scope,$location, $state, $log, $auth, $window) {


    $scope.authenticate = function(provider) {
      $auth.link(provider).then(function (response){
        $auth.setToken(response);
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

  });
