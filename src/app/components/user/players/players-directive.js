/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('players', ['$log', 'userService', 'stompService', function($log, userService, stompService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        playGameId: '=gameId'
      },
      templateUrl: 'app/components/user/players/players.html',
      controller: function($scope){
        userService.playerList($scope.playGameId).then(function (data){
          $scope.players = data;
        });
        stompService.subscribePlayerList($scope.playGameId, function(data){
          $log.info('new player');
          $log.info(data);
          $scope.players = data;
          $scope.$apply();
        });
      }
    };
  }]);
