'use strict';

angular.module('lct')
  .directive('playGameEnded', ['$log', 'gameService', function($log, gameService) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      templateUrl: 'app/components/game/play/directives/ended.html',
      controller: function($scope){
        gameService.currentRound($scope.gameMetaData.playGameId).then(function(round){
          $scope.round = round;
        });

        gameService.gameScores($scope.gameMetaData.playGameId).then(function(gameScore){
          $scope.gameScore = gameScore;
          var winners = '';
          var points = 0;
          for( var i = 0 ; i < gameScore.playerGameScoreList.length; i++ ){
            if( gameScore.playerGameScoreList[i].total < points ){
              break;
            }else if ( gameScore.playerGameScoreList[i].total > points ){
              winners = '';
            }
            points = gameScore.playerGameScoreList[i].total;
            $scope.percentageFromTop = gameScore.playerGameScoreList[i].percentageFromTop;
            $scope.bestScore = points;
            if(winners !== ''){
              winners += ', ';
            }
            winners += gameScore.playerGameScoreList[i].name;
          }
          $scope.winners = winners;
        });
      }
    };
  }]);
