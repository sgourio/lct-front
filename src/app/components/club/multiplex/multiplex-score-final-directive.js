/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('multiplexScoreFinal', [ '$log', '$filter', 'multiplexService', function($log, $filter, multiplexService) {
    return {
      restrict: 'E',
      scope: {
        'gameId' : '='
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/multiplex-score-final.html',
      controller: function($scope) {
        $scope.scoreList = [];
        multiplexService.totalScore($scope.gameId)
          .then(function (result){
            $scope.scoreList = [];
            var i;
            for( i = 0 ; i < result.length ; i++) {
              $scope.scoreList.push({
                name: result[i].name,
                total: result[i].total
              });
            };
            $scope.scoreList.sort(function(a, b){return b.total- a.total});
        });
      }
    };
  }]);
