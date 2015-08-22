'use strict';

function formatDuration(seconds) {
  var secNum = parseInt(seconds, 10); // don't forget the second param
  var hours   = Math.floor(secNum / 3600);
  var minutes = Math.floor((secNum - (hours * 3600)) / 60);

  if (minutes < 10) {minutes = '0'+minutes;}
  var time = '';
  if( hours > 0) {
    time = hours + 'h' +minutes ;

  }else{
    time = minutes + 'm';
  }

  return time;
}

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
          return formatDuration(seconds);
        };

        $scope.reload = function(){
          if( $scope.owner === 'auto') {

            gameService.autoList($scope.max).then(function (data) {
              $scope.games=data;
              if( $scope.games.length > 0 ) {
                $scope.title = 'Parties automatiques';
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
