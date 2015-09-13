'use strict';

angular.module('lct')
  .controller('NavbarCtrl', [ '$scope', '$location', '$state', '$auth', '$window', 'userService', function ($scope,$location, $state, $auth, $window, userService) {
    $scope.logout = function(){
      $auth.logout();
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    //$scope.isAdmin = function(){
    //  if( typeof $window.sessionStorage.admin === 'undefined'  ){
    //    userService.isAdmin().then(function(isAdmin){
    //      $window.sessionStorage.admin = isAdmin;
    //      $auth.admin = isAdmin;
    //      return isAdmin;
    //    });
    //  }else{
    //    $auth.admin = $window.sessionStorage.admin;
    //  }
    //  return $auth.admin;
    //};
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
