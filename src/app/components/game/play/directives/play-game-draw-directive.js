'use strict';

angular.module('lct')
  .directive('playGameDraw', ['$log', 'gameService', '$state', '$auth', function($log, gameService, $state, $auth) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/play-game-draw.html',
      controller: function($scope){
        var draw = [];
        for( var i = 0 ; i < $scope.round.draw.length; i++) {
          var droppedTile = {
            tile: $scope.round.draw[i],
            value: $scope.round.draw[i].value
          };
          draw.push(droppedTile);
        }
        $scope.draw = draw;

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
