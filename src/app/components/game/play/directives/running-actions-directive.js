'use strict';

angular.module('lct')
  .directive('runningActions', ['$log', 'gameService', '$state', '$auth', 'playGameService', function($log, gameService, $state, $auth, playGameService) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      templateUrl: 'app/components/game/play/directives/running-actions.html',
      controller: function($scope){
        $scope.putWord = function(board){
          var check = playGameService.isBoardValid(board);
          if( check.valid ){
           $log.info(check.wordReference);
          }else{
            $log.info(check);
            $scope.error = check.error;
          }
        }
      }
    };
  }]);
