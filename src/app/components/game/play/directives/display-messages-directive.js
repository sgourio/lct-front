/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('displayMessages', ['$log', 'messageService', function($log) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/display-messages.html',
      controller: function($scope, messageService) {
        $scope.msg = messageService;
      }
    };
  }]);
