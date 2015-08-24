'use strict';

angular.module('lct')
  .directive('openedActions', ['$log', 'gameService', '$state', '$auth', function($log, gameService, $state, $auth) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      templateUrl: 'app/components/game/play/directives/opened-actions.html',
      controller: function($scope){
        $log.info($auth.getPayload());
        $scope.isOwner=$auth.getPayload().sub === $scope.gameMetaData.owner;
        var d = new Date();
        var min = d.getMinutes() < 15 ? 15 : d.getMinutes() < 30 ? 30 : d.getMinutes() < 45 ? 45 : 0;
        if( min > 0 ) {
          $scope.quarterDate = d.getHours() +'h' + min;
          $scope.qDate = new Date().setMinutes(min);
        }else if (d.getHours() < 23 ){
          $scope.quarterDate = (d.getHours() + 1) +'h';
          $scope.qDate = new Date().setHours(d.getHours() + 1).setMinutes(0);
        } else{
          $scope.quarterDate = 'minuit l\'heure du crime';
          $scope.qDate = new Date().setDate(d.getDate() + 1).setHours(0).setMinutes(0);
        }
        $scope.timeToStart = new Date(new Date().getTime() + 60000); // add one minute

        $scope.start = function(){
          gameService.startGame($scope.gameMetaData.playGameId, $scope.timeToStart);
        };

        $scope.startNow = function(){
          gameService.startGame($scope.gameMetaData.playGameId, new Date(new Date().getTime() + 20000));
        };

        $scope.startNextQuarter = function(){
          gameService.startGame($scope.gameMetaData.playGameId, $scope.qDate);
        };

      }
    };
  }]);
