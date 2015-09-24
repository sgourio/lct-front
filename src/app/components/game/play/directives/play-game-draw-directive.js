'use strict';

angular.module('lct')
  .directive('playGameDraw', ['$log', 'gameService', '$state', '$auth', function() {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/play-game-draw.html',
      controller: function($scope){
        //$scope.round.draw;
        //$scope.round.boardGame; // used for drag'n'drop

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

        $scope.startChangeJokerValue = function(droppedTile){
          $scope.currentJoker = droppedTile;
        };

        $scope.changeJokerValue = function(letter){
          $scope.currentJoker.value = letter;
        };
      }
    };
  }]);
