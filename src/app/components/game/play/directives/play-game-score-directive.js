/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('playGameScore', ['$log', 'gameService', '$state', '$auth', 'playGameService', 'stompService', function($log, gameService, $state, $auth, playGameService, stompService) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/play-game-score.html',
      controller: function($scope){
        $scope.username = $auth.getPayload().sub;

        gameService.gameScores($scope.gameMetaData.playGameId).then(function(gameScore){
          $log.info(gameScore);
          $scope.gameScore = gameScore;
        });

        stompService.subscribeGameScores($scope.gameMetaData.playGameId, function(gameScore){
          $log.info('update scores ');
          $scope.gameScore = gameScore;
          $scope.$apply();
        });
      }
    };
  }]);
