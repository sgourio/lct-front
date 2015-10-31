/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('displayMultiplex', [ '$log', 'multiplexService', 'stompService', function($log, multiplexService, stompService) {
    return {
      restrict: 'E',
      scope: {
        'gameId' : '@'
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/display-multiplex.html',
      controller: function($scope) {
        if( $scope.gameId ) {
          multiplexService.metaData($scope.gameId).then(function(data){
            $scope.multiplex = data;

            stompService.subscribeMultiplexGameMetaData($scope.gameId, function(metaData){
              $scope.multiplex = metaData;
            });

            stompService.subscribeMultiplex($scope.gameId, function(round){
              $log.info('change round ' + round.roundNumber);
              $scope.round = round;
              $scope.$apply();
            });
          });
        }
      }
    };
  }]);
