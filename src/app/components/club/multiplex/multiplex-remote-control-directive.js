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
        'gameId' : '@',
        'clubId' : '='
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/multiplex-remote-control.html',
      controller: function($scope) {
        $scope.$state = $state;
        $scope.roundNumber = 0;
        $scope.scoreRoundNumber = 0;
        $scope.workflow = ''; // displayDraw, running, displayResult
        if( $scope.gameId ) {

          multiplexService.metaData($scope.gameId).then(function(data){
            $scope.multiplex = data;

            $scope.nextRound = function(){
              multiplexService.changeRound($scope.multiplex.multiplexGameId , ++$scope.roundNumber);
              if( $scope.roundNumber === 1 ) {
                $scope.workflow = 'displayDraw';
              }else{
                $scope.workflow = 'displayResult';
              }
            };
            $scope.previousRound = function(){
              multiplexService.changeRound($scope.multiplex.multiplexGameId , --$scope.roundNumber);
            };

            $scope.sendMessage = function(message){
              multiplexService.sendMessage($scope.multiplex.multiplexGameId , message);
            };

            $scope.next = function(){
              if( $scope.roundNumber === 0 || ($scope.workflow === 'running' && $scope.roundNumber <= $scope.multiplex.numberOfRound)){
                if( $scope.roundNumber === 0 ) {
                  $scope.workflow = 'displayDraw';
                }else{
                  $scope.workflow = 'displayResult';
                }
                $scope.nextRound();
              }else if($scope.workflow === 'displayDraw'){
                $scope.workflow = 'running';
                $scope.sendMessage('running');
              }else if($scope.workflow === 'displayResult'){
                $scope.workflow = 'displayDraw';
                $scope.sendMessage('displayDraw');
              }
            };

            stompService.subscribeMultiplex($scope.gameId, function(round){
              $scope.round = round;
              $scope.$apply();
            });
          });
        }

      }
    };
  }]);
