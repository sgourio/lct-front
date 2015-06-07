/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .controller('SignInCtrl', function ($scope,$location, AccessToken, $state, $log) {

    $scope.$on('oauth:login', function() {
      $log.info('Try to connect...');
    });

    $scope.$on('oauth:logout', function() {
      $state.transitionTo('home');
    });

  });
