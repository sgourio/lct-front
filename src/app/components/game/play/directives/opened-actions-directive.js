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
        var qdate = new Date();
        if( min > 0 ) {
          $scope.quarterDate = d.getHours() +'h' + min;
          $scope.qDate = new Date().setMinutes(min);
        }else if (d.getHours() < 23 ){
          $scope.quarterDate = (d.getHours() + 1) +'h';
          qdate.setHours(d.getHours() + 1);
          qdate.setMinutes(0);
          $scope.qDate = qdate;
        } else{
          $scope.quarterDate = 'minuit l\'heure du crime';
          qdate.setDate(d.getDate() + 1);
          qdate.setHours(0);
          qdate.setMinutes(0);
          $scope.qDate = midnight;
        }
        var inOneMinute = new Date(new Date().getTime() + 60000);
        inOneMinute.setSeconds(0);
        $scope.timeToStart = {date : inOneMinute}; // add one minute

        $scope.start = function(){
          gameService.startGame($scope.gameMetaData.playGameId, $scope.timeToStart.date);
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
