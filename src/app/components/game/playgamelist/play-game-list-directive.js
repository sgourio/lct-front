'use strict';

angular.module('lct')
  .directive('playGameList', ['$log', 'gameService', '$state', function($log, gameService, $state) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/game/playgamelist/play-game-list.html',
      controller: function($scope){
        $scope.viewGame = function(playGameId){
          $state.go('play',{playGameId: playGameId});
        };
        $scope.joinGame = function(playGameId){
          gameService.joinGame(playGameId).then(function(){
            $state.go('play',{playGameId: playGameId});
          });
        };

        $scope.duration = function(roundTime, nbRounds){
          var seconds = roundTime * nbRounds;
          return gameService.formatDuration(seconds);
        };

        $scope.load = function(){
            gameService.listOpenedGames().then(function (data) {
              $scope.games=data;
            });
        };
        $scope.load();
      }
    };
  }]);
