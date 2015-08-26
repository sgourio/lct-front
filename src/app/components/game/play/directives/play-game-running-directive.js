'use strict';

angular.module('lct')
  .directive('playGameRunning', ['$log', 'gameService', '$state', '$auth', function($log, gameService, $state, $auth) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      templateUrl: 'app/components/game/play/directives/play-game-running.html',
      controller: function($scope){
        $scope.running = $scope.gameMetaData.status === 'running';
        gameService.currentRound($scope.gameMetaData.playGameId).then(function(round){
          $log.info(round);
          $scope.round = round;
        });

      }
    };
  }]);
