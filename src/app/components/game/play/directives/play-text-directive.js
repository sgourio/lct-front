/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('playText', ['$log', 'gameService', 'gameBoardService', '$state', '$auth', 'playGameService', 'messageService' , function($log, gameService, gameBoardService, $state, $auth, playGameService, messageService) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/play-text.html',
      controller: function($scope){
        $scope.proposal = '';
        $scope.fieldClass = '';
        $scope.playing = function(){
          $scope.proposal = $scope.proposal.toUpperCase();
          var re = /^([0-9]|1[0-5])([A-O])\s([A-Z]+)$|^([A-O])([0-9]|1[0-5])\s([A-Z]+)$/g;
          if( $scope.proposal.match(re)){
            gameBoardService.clearBoard($scope.round.boardGame, $scope.round.draw);
            var result = re.exec($scope.proposal);
            var firstColumn;
            var firstRow;
            var horizontal = true;
            var word;
            if( result[1] ){ // vertical
              horizontal = false;
              firstColumn = result[1] - 1;
              firstRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(result[2]);
              word = result[3];
            }else{
              firstRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(result[4]);
              firstColumn = result[5] - 1;
              word = result[6];
            }
            var currentRow = firstRow;
            var currentColumn = firstColumn;
            var i;
            for( i = 0; i < word.length ; i++) {
              $log.info(currentColumn);
              gameBoardService.moveLetterToBoard($scope.round.boardGame, $scope.round.draw, word[i], currentRow, currentColumn);
              if( horizontal ){
                currentColumn++;
              }else{
                currentRow++;
              }
            }
            //'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf()
            $scope.fieldClass = '';
          }else{
            $scope.fieldClass = 'has-warning';
          }
        };

        $scope.keyDown = function(event){
          var code = (event.keyCode ? event.keyCode : event.which);
          if( code === 27){ // escape
            $scope.proposal = '';
          }else if( code === 13){ // enter
            $scope.putWord($scope.round.boardGame);
          }
        };

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
