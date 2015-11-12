/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('viewGameBoard', ['$log', 'gameService', '$state', '$auth', 'gameBoardService', function($log, gameService, $state, $auth, gameBoardService) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/view/view-game-board.html',
      controller: function($scope){
        var squareWidth = 37;
        var squareHeight = 37;
        var squareOffSetX = 15;
        var squareOffSetY = 13;
        var boardOffset = 0;

        $scope.$on('$viewContentLoaded', function() {
          boardOffset = angular.element('.board').offset();
        });
        $scope.squarePosition = function(row, column){
          return gameBoardService.squarePosition(row, column, squareHeight, squareWidth, squareOffSetY, squareOffSetX);
        };
      }
    };
  }]);
