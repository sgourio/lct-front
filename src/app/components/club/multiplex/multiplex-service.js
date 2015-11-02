/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.multiplexService
 * @description
 * # gameService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .service('multiplexService', [ '$http', 'apiRoot', '$log', '$q', function ($http, apiRoot, $log, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var multiplexService = {

      openGame: function(gameId, gameName, roundTime){
        return $q(function(resolve, reject) {
          $http.put(apiRoot + '/multiplex/openGame',{
            gameId : gameId,
            gameName : gameName,
            roundTime : roundTime
          }).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service PUT ' + apiRoot + '/multiplex/openGame' +' respond ' + status);
              reject();
            });
        });
      },


      metaData: function(multiplexGameId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/multiplex/game/'+multiplexGameId).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/multiplex/game/'+ multiplexGameId +' respond ' + status);
              reject();
            });
        });
      },

      changeRound: function(multiplexGameId, roundNumber){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/multiplex/game/'+multiplexGameId +'/active/'+roundNumber).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/multiplex/game/'+multiplexGameId +'/active/'+roundNumber +' respond ' + status);
              reject();
            });
        });
      },

      sendMessage: function(multiplexGameId, message){
        return $q(function(resolve, reject){
          $http.post(apiRoot + '/multiplex/game/'+multiplexGameId +'/message', message).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/multiplex/game/'+multiplexGameId +'/message  respond ' + status);
              reject();
            });
        });
      }
    };
    return multiplexService;
  }]);
