/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('multiplexRemoteControl', [ 'multiplexService', 'stompService', '$timeout', '$state', function(multiplexService, stompService, $timeout, $state) {
    return {
      restrict: 'E',
      scope: {
        'gameId' : '@'
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/multiplex-remote-control.html',
      controller: function($scope) {
        $scope.$state = $state;
        $scope.roundNumber = 0;
        $scope.timer = 0;
        if( $scope.gameId ) {
          var countDown = function() {
            if ($scope.timer > 0) {
              $scope.timer = $scope.timer - 1;
            }
            $timeout(countDown, 1000);
          };
          countDown();

          multiplexService.metaData($scope.gameId).then(function(data){
            $scope.multiplex = data;

            $scope.nextRound = function(){
              multiplexService.changeRound($scope.multiplex.multiplexGameId , ++$scope.roundNumber);
            };
            $scope.previousRound = function(){
              multiplexService.changeRound($scope.multiplex.multiplexGameId , --$scope.roundNumber);
            };

            stompService.subscribeMultiplex($scope.gameId, function(round){
              $scope.round = round;
              $scope.timer = $scope.multiplex.timeByRound;
              $scope.$apply();
            });
          });
        }
      }
    };
  }]);
