/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('signin', [ '$location', '$state', '$auth', '$window', 'userService', function ($location, $state, $auth, $window) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/user/signin-buttons.html',
      controller: function($scope){
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
      }
    };
  }]);
