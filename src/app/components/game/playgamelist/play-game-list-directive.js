'use strict';

angular.module('lct')
  .directive('playGameList', ['$log', 'gameService', function($log, gameService) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/game/playgamelist/play-game-list.html',
      controller: function($scope){
        $scope.load = function(){
            gameService.listOpenedGames().then(function (data) {
              $scope.games=data;
            });
        };
        $scope.load();
      }
    };
  }]);
