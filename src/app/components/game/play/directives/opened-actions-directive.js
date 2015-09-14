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
        $scope.isOwner=$auth.getPayload().sub === $scope.gameMetaData.owner;
        $scope.displayStartDate = function(){
          return $scope.gameMetaData.startDate === null;
        };
        var getTimer = function() {
          gameService.getTimer($scope.gameMetaData.playGameId).then(function (timer) {
            $scope.timer = timer;
          });
        };

        var started = function(){
          getTimer();
        };

        if($scope.displayStartDate()) {
          $scope.startAt = 'now';
          var d = new Date();
          var min = d.getMinutes() < 15 ? 15 : d.getMinutes() < 30 ? 30 : d.getMinutes() < 45 ? 45 : 0;
          var qdate = new Date();
          if (min > 0) {
            $scope.quarterDate = d.getHours() + 'h' + min;
            $scope.qDate = new Date().setMinutes(min);
          } else if (d.getHours() < 23) {
            $scope.quarterDate = (d.getHours() + 1) + 'h';
            qdate.setHours(d.getHours() + 1);
            qdate.setMinutes(0);
            $scope.qDate = qdate;
          } else {
            $scope.quarterDate = 'minuit l\'heure du crime';
            qdate.setDate(d.getDate() + 1);
            qdate.setHours(0);
            qdate.setMinutes(0);
            $scope.qDate = qdate;
          }
          var inOneMinute = new Date(new Date().getTime() + 60000);
          inOneMinute.setSeconds(0);
          $scope.timeToStart = {date: inOneMinute}; // add one minute

          $scope.start = function (startAt) {
            if (startAt === 'now') {
              gameService.startGame($scope.gameMetaData.playGameId, new Date(new Date().getTime() + 20000)).then(started);
            } else if (startAt === 'nextQuarter') {
              gameService.startGame($scope.gameMetaData.playGameId, $scope.qDate).then(started);
            } else {
              if( $scope.timeToStart.date.getTime() < d.getTime() ) {
                $scope.timeToStart.date.setDate(d.getDate() + 1);
              }
              gameService.startGame($scope.gameMetaData.playGameId, $scope.timeToStart.date).then(started);
            }
          };
        }

        $scope.quitGame = function(playGameId){
          gameService.quitGame(playGameId).then(function(){
            $state.go('gameList');
          });
        };

      }
    };
  }]);
