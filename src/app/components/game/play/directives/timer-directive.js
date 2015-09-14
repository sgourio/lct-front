'use strict';

angular.module('lct')
  .directive('timer', ['$log', 'gameService', 'stompService', '$timeout', function($log, gameService, stompService, $timeout) {
    return {
      restrict: 'E',
      scope: {
        playGameId:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/timer.html',
      controller: function($scope){
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
        updateTimer($scope.playGameId);
        stompService.subscribeTimer($scope.playGameId, function(timer){
          $scope.timer=timer;
          $scope.$apply();
        });
      }
    };
  }]);
