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
        var toState = $window.sessionStorage.toState || 'account';
        $window.sessionStorage.toState = null;
        if( !toState || toState === 'signin'){
          toState = 'account';
        }
        $state.transitionTo(toState);
      });
    };

    $scope.logout = function(){
      $auth.logout();
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    if( $scope.isAuthenticated() ){
      var to = $window.sessionStorage.toState || 'home';
      $state.transitionTo(to);
    }

  }]);
