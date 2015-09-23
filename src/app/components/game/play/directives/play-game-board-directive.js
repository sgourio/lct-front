'use strict';

angular.module('lct')
  .directive('playGameBoard', ['$log', 'gameService', '$state', '$auth', 'gameBoardService', function($log, gameService, $state, $auth, gameBoardService) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/play-game-board.html',
      controller: function($scope){
        var squareWidth = 37;
        var squareHeight = 37;
        var squareOffSetX = 15;
        var squareOffSetY = 13;
        var boardOffset = 0;

        $scope.selectedSquare={row:0, column:0};

        $scope.$on('$viewContentLoaded', function() {
          boardOffset = angular.element('.board').offset();
        });
        $scope.squarePosition = function(row, column){
          return gameBoardService.squarePosition(row, column, squareHeight, squareWidth, squareOffSetY, squareOffSetX);
        };

        $scope.startChangeJokerValue = function(droppedTile){
          $scope.currentJoker = droppedTile;
        };

        $scope.changeJokerValue = function(letter){
          $scope.currentJoker.value = letter;
        };

        $scope.back = function($event, tile, row, column){
          if($event.button === 2) {
            gameBoardService.moveBoardToDraw($scope.round.boardGame, $scope.round.draw, tile, $scope.round.draw.length, row, column);
          }
        };

        $scope.selectSquare = function(row, column){
          $scope.selectedSquare.row=row;
          $scope.selectedSquare.column=column;
        };

        $scope.isSelected = function(row, column){
          return $scope.selectedSquare.row == row && $scope.selectedSquare.column == column;
        };

        $scope.tileImageUrl = function(tile, jokerValue){
          if (tile.tileType !== 'wildcard') {
            return 'assets/images/lettres36/fr/normal/' + tile.value + '.gif';
          } else {
            if( jokerValue && jokerValue !== '?' ){
              return '/assets/images/lettres36/fr/joker/'+ jokerValue +'.gif';
            }else{
              return 'assets/images/lettres36/fr/normal/wildcard.gif';
            }
          }
        };

        $scope.keyDown = function(event){
          var code = (event.keyCode ? event.keyCode : event.which);
          if( code >= 65 && code <= 90){
            if( $scope.selectedSquare ) {
              gameBoardService.moveLetterToBoard($scope.round.boardGame, $scope.round.draw, String.fromCharCode(code), $scope.selectedSquare.row, $scope.selectedSquare.column)
            }
          }else if( code == 188){ //joker
            entrerLettre("JOKER");
          }else if( (code >=37 && code <= 40) || (code >=98 && code <= 104)){
            event.preventDefault();
            moveSelection(code);
          } else if( code == 46 || code == 32 || code === 8){ // delete
            if( $scope.selectedSquare ) {
              var tile = $scope.round.boardGame.squares[$scope.selectedSquare.row][$scope.selectedSquare.column].droppedTile;
              gameBoardService.moveBoardToDraw($scope.round.boardGame, $scope.round.draw, tile, $scope.round.draw.length, $scope.selectedSquare.row, $scope.selectedSquare.column )
            }
          }else if( code == 27){ // escape
            gameBoardService.clearBoard($scope.round.boardGame, $scope.round.draw);
          }else if( code == 13){ // enter
            poserDuplicate();
          }
        };

        /**
         * move
         * @param fleche (touche tapee par l'utilisateur)
         * @return
         */
        function moveSelection(fleche){
          if( fleche == 37 || fleche == 100){ // left
                  if( $scope.selectedSquare.column > 0 ){
                      $scope.selectedSquare.column = $scope.selectedSquare.column - 1;
                  }
          }
          else if( fleche == 38 || fleche == 104){ // up
            if( $scope.selectedSquare.row > 0 ){
              $scope.selectedSquare.row = $scope.selectedSquare.row - 1;
            }

          }
          else if( fleche == 39 || fleche == 102){ // right
            if( $scope.selectedSquare.column < 14 ){
              $scope.selectedSquare.column = $scope.selectedSquare.column + 1;
            }
          }
          else if( fleche == 40 || fleche == 98){ // down
            if( $scope.selectedSquare.row < 14 ){
              $scope.selectedSquare.row = $scope.selectedSquare.row + 1;
            }
          }
        }
      }
    };
  }]);
