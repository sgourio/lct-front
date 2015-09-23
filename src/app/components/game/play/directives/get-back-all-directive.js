/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('getBackAll', ['$log', 'gameService', '$state', '$auth', 'gameBoardService', function($log, gameService, $state, $auth, gameBoardService) {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      template: '<i class="fa fa-arrow-up fa-2x action-icon action-back-all" data-ng-click="backAll()" title="Ramener toutes les lettres sur le support"></i>',
      controller: function($scope){
        $scope.backAll = function(){
            gameBoardService.clearBoard($scope.round.boardGame, $scope.round.draw);
        };
      }
    };
  }]);
