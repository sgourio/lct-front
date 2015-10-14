'use strict';
angular.module('lct')
  .directive('gameList', ['$log', 'gameService', function($log, gameService) {
    return {
      restrict: 'E',
      scope: {
        max: '=max',
        roundTime: '=roundTime',
        owner: '@owner',
        refreshable: '@refreshable',
        selectedGame: '='
      },
      templateUrl: 'app/components/game/create/auto/game-list.html',
      controller: function($scope){
        //$scope.max=10;
        $scope.canRefresh =  $scope.refreshable === 'true';


        $scope.duration = function(roundTime, nbRounds){
          var seconds = roundTime * nbRounds;
          return gameService.formatDuration(seconds);
        };

        $scope.reload = function(){
          if( $scope.owner === 'auto') {

            gameService.autoList($scope.max).then(function (data) {
              $scope.games=data;
              if( $scope.games.length > 0 ) {
                $scope.title = 'Parties créées par LCT';
              }
            });
          }else{
            gameService.list(function(data){
              $scope.games=data;
              if( $scope.games.length > 0 ) {
                $scope.title='Parties personnalisées';
              }
            });
          }
        };

        $scope.selectGame = function(id){
          $scope.selectedGame = id;
        };

        $scope.reload();
      }
    };
  }]);
