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
    var initialize = function(playGameMetaData) {
      $scope.metaData = playGameMetaData;
      $scope.opened = playGameMetaData.status === 'opened';
      $scope.running = playGameMetaData.status === 'running';
      $scope.ended = playGameMetaData.status === 'ended';
    };

    var countDown = function(playGameId){
      if( $scope.timer > 0 ){
        $scope.timer = $scope.timer - 1;
      }
      $timeout(function(){countDown(playGameId);}, 1000);
    };

    var init = false;
    var updateTimer = function(playGameId){
      gameService.getTimer(playGameId).then(function(timer){
        $scope.timer=timer;
        if( !init ){
          init = true;
          countDown(playGameId);
        }
      });
    };

    gameService.playGameMetaData($stateParams.playGameId).then(function(playGameMetaData){
      initialize(playGameMetaData);
      updateTimer(playGameMetaData.playGameId);

      stompService.subscribeTimer(playGameMetaData.playGameId, function(timer){
        $scope.timer=timer;
        $scope.$apply();
      });

      stompService.subscribeGameMetaData(playGameMetaData.playGameId, function(metaData){
        $log.info('pushed meta data');
        initialize(metaData);
        updateTimer(playGameMetaData.playGameId);
      });


    });
  }]);
