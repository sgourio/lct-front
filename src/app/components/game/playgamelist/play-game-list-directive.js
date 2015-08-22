'use strict';

angular.module('lct')
  .directive('playGameList', ['$log', 'gameService', '$state', function($log, gameService, $state) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/game/playgamelist/play-game-list.html',
      controller: function($scope){
        $scope.goGame = function(playGameId){
          $state.go('play',{playGameId: playGameId});
        };
        $scope.joinGame = function(playGameId){
          gameService.joinGame(playGameId).then(function(data){
            $state.go('play',{playGameId: playGameId});
          });
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
