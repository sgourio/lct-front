/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.gameService
 * @description
 * # gameService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .service('gameService', [ '$http', 'apiRoot', '$log', function ($http, apiRoot, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var gameService = {
      add: function(game, callbackOk){
        $http.post(apiRoot + '/game/fr/add', game).
          success(function (data) {
            $log.info('Adding game end with success, id: ' + data);
            game.id = data;
            callbackOk();
          }).
          error(function (data, status) {
            $log.error('Service ' + apiRoot + '/game/fr/add' +' respond ' + status);
          });
      },

      save: function(game, callbackOk){
        var req={
          method: 'PUT',
          url: apiRoot + '/game/fr/' + game.id,
          data: game
        };
        $http(req).
          success(function () {
            $log.info('Game saved');
            callbackOk();
          }).
          error(function (data, status) {
            $log.error('Service ' + apiRoot + '/game/fr/' + game.id +' respond ' + status);
          });
      },

      list: function(callbackOk){
        $log.info('apiRoot ' + apiRoot);
        $http.get(apiRoot + '/game/fr/').
          success(function (data) {
            $log.info('gameList: ' + data);
            callbackOk(data);
          }).
          error(function (data, status) {
            $log.error('Service GET ' + apiRoot + '/game/fr/' +' respond ' + status);
          });
      }
    };
    return gameService;
  }]);
