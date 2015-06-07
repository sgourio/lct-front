'use strict';

angular.module('lct')
  .controller('NavbarCtrl', function ($scope,$location, AccessToken, $state) {

    $scope.$on('oauth:login', function() {
    });

    $scope.$on('oauth:logout', function() {
      $state.transitionTo('home');
    });

    $scope.date = new Date();
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
