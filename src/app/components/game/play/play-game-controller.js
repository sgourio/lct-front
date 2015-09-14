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


    gameService.playGameMetaData($stateParams.playGameId).then(function(playGameMetaData){
      initialize(playGameMetaData);

      stompService.subscribeGameMetaData(playGameMetaData.playGameId, function(metaData){
        $log.info('pushed meta data');
        initialize(metaData);
      });
    });
  }]);
