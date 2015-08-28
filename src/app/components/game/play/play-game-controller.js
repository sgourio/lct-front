/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.gameBoardService
 * @description
 * # gameBoardService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .controller('PlayGameCtrl', [ '$scope', '$stateParams', '$log', 'gameService', '$timeout', 'stompService', function ($scope, $stateParams, $log, gameService, $timeout, stompService) {
    $log.info($stateParams);
    gameService.playGameMetaData($stateParams.playGameId).then(function(playGameMetaData){
      $scope.metaData = playGameMetaData;
      $scope.opened = playGameMetaData.status === 'opened';
      $scope.running = playGameMetaData.status === 'running';
      $scope.ended = playGameMetaData.status === 'ended';

      var countDown = function(){
        if( $scope.timer > 0 ){
          $scope.timer = $scope.timer - 1;
        }
        $timeout(countDown, 1000);
      };

      var init = false;
      stompService.subscribeTimer($scope.metaData.playGameId, function(timer){
        $scope.timer=timer;
        if( !init ){
          init = true;
          countDown();
        }
        $scope.$apply();
      });


    });
  }]);
