/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('displayMultiplex', [ '$log', 'multiplexService', 'stompService', '$timeout', function($log, multiplexService, stompService, $timeout) {
    return {
      restrict: 'E',
      scope: {
        'gameId' : '@'
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/display-multiplex.html',
      controller: function($scope) {
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

            stompService.subscribeMultiplexMessage($scope.gameId, function(result){
              $log.info(result);
              if( result.message === 'running') {
                $scope.timer = $scope.multiplex.timeByRound;
              }else if ( result.message === 'displayDraw') {
                $scope.timer = 0;
              }else if (result.message === 'displayResult') {
                $scope.timer = 0;
              }
              $scope.message = result.message;
              $scope.$apply();
            });

            stompService.subscribeMultiplexGameMetaData($scope.gameId, function(metaData){
              $scope.multiplex = metaData;
            });

            stompService.subscribeMultiplex($scope.gameId, function(round){
              $log.info('change round ' + round.roundNumber);
              $scope.round = round;
              $scope.timer = 0;
              if (round.roundNumber > $scope.multiplex.numberOfRound){
                $scope.message = 'finalScores';
              }else if( round.roundNumber > 1 ) {
                $scope.message = 'displayResult';
              }else if (round.roundNumber > 0 ){
                $scope.message = 'displayDraw';
              }
              $scope.$apply();
            });


          });
        }
      }
    };
  }]);
