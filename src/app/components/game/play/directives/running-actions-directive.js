'use strict';

angular.module('lct')
  .directive('runningActions', ['$log', 'gameService', '$state', '$auth', 'playGameService', 'messageService' , function($log, gameService, $state, $auth, playGameService, messageService) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/running-actions.html',
      controller: function($scope){
        $scope.putWord = function(board){
          var roundNumber = $scope.round.roundNumber;
          var check = playGameService.isBoardValid(board);
          if( check.valid ){
            $log.info(check.wordReference);
            gameService.putWord($scope.round.playGameId, check.wordReference, roundNumber).then(function(result){
              messageService.addWordResult(result, roundNumber);
            });
          }else{
            $log.info(check);
            messageService.addErrorMessage(check.error, roundNumber);
            $scope.error = check.error;
          }
        };
      }
    };
  }]);
