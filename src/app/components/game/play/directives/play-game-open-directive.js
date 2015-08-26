/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('playGameOpen', ['$log', 'gameService', '$state', '$auth', function($log, gameService, $state, $auth) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      templateUrl: 'app/components/game/play/directives/play-game-open.html',
      controller: function($scope){
        $scope.opened = $scope.gameMetaData.status === 'opened';
        var seconds = $scope.gameMetaData.timeByRound * $scope.gameMetaData.numberOfRound;
        $scope.duration = gameService.formatDuration(seconds);
      }
    };
  }]);
