/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('playGameOpen', ['$log', 'gameService', '$timeout', 'stompService', function($log, gameService, $timeout, stompService) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'=',
        timer:'='
      },
      templateUrl: 'app/components/game/play/directives/play-game-open.html',
      controller: function($scope){
        $scope.opened = function(gameMetaData){
          return gameMetaData.status === 'opened';
        };
        var seconds = $scope.gameMetaData.timeByRound * $scope.gameMetaData.numberOfRound;
        $scope.gameDuration = gameService.formatDuration(seconds);
        $scope.duration = function(seconds){
          return gameService.formatDuration(seconds);
        };


        var countDown = function(playGameId){
          if( $scope.timer > 0 ){
            $scope.timer = $scope.timer - 1;
          }
          $timeout(function(){countDown(playGameId);}, 1000);
        };

        var init = false;
        var updateTimer = function(playGameId){
          gameService.getTimer(playGameId).then(function(timer){
            $scope.timer=timer;
            if( !init ){
              init = true;
              countDown(playGameId);
            }
          });
        };
        updateTimer($scope.gameMetaData.playGameId);
        stompService.subscribeTimer($scope.gameMetaData.playGameId, function(timer){
          $scope.timer=timer;
          $scope.$apply();
        });
      }
    };
  }]);
