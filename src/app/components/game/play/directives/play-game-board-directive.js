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
        var squareOffSetX = 16;
        var squareOffSetY = 14;
        var boardOffset = 0;

        $scope.$on('$viewContentLoaded', function() {
          boardOffset = angular.element('.board').offset();
        });
        $scope.squarePosition = function(row, column){
          return gameBoardService.squarePosition(row, column, squareHeight, squareWidth, squareOffSetY, squareOffSetX);
        };

        $scope.back = function($event, tile, row, column){
          if($event.button === 2) {
            gameBoardService.moveBoardToDraw($scope.round.boardGame, $scope.round.draw, tile, $scope.round.draw.length, row, column);
          }
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
      }
    };
  }]);
