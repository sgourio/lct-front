'use strict';

angular.module('lct')
  .directive('playGameRunning', ['$log', 'gameService', '$state', '$auth', 'stompService', function($log, gameService, $state, $auth, stompService) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      templateUrl: 'app/components/game/play/directives/play-game-running.html',
      controller: function($scope){
        $scope.running = $scope.gameMetaData.status === 'running';

        gameService.currentRound($scope.gameMetaData.playGameId).then(function(round){
          $scope.round = round;
        });

        stompService.subscribeGame($scope.gameMetaData.playGameId, function(round){
          $log.info('change round ' + round.roundNumber);
          $scope.round = round;
          $scope.$apply();
        });
      }
    };
  }]);
