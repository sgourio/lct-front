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
  .controller('PlayGameCtrl', [ '$scope', '$stateParams', '$log', 'gameService', function ($scope, $stateParams, $log, gameService) {
    $log.info($stateParams);
    gameService.playGameMetaData($stateParams.playGameId).then(function(playGameMetaData){
      $scope.metaData = playGameMetaData;
      $scope.opened = playGameMetaData.status === 'opened';
      $scope.running = playGameMetaData.status === 'running';
      $scope.ended = playGameMetaData.status === 'ended';



    });
  }]);
