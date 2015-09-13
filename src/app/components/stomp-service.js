/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

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
  .service('stompService', [ '$http', 'apiRoot', '$log', '$q', '$stomp', '$timeout', function ($http, apiRoot, $log, $q, $stomp, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var intialization = false;
    var initialized = false;

    var stompService = {
      init: function(){
        var deferred = $q.defer();

        return $q(function(resolve, reject) {
          if( initialized ){
            resolve();
          }else if(intialization){
            var checkIt = function(){
              if( !initialized ){
                $timeout(checkIt, 300);
              }else{
                resolve();
              }
            };
            checkIt();
          }else{
            intialization = true;
            $stomp.connect('/hello').then(function () {
              initialized = true;
              resolve();
            });
          }
        });
      },

      subscribeGame: function(playGameId, callback){
        this.init().then(function () {
          $stomp.subscribe('/topic/game/' + playGameId +'/round', callback, {});
        });
      },

      subscribeGameMetaData: function(playGameId, callback){
        this.init().then(function () {
          $stomp.subscribe('/topic/game/' + playGameId +'/metadata', callback, {});
        });
      },

      subscribeGameScores: function(playGameId, callback){
        this.init().then(function () {
          $stomp.subscribe('/topic/game/' + playGameId +'/scores', callback, {});
        });
      },

      subscribeTimer: function(playGameId, callback){
        this.init().then(function () {
          $stomp.subscribe('/topic/game/' + playGameId +'/timer', callback, {});
        });
      },

      subscribeUserList: function(callback){
        // subscribe to topic gamerList to update gamerList everytime a new user is connected
        this.init().then(function () {
          $stomp.subscribe('/topic/gamerList', callback, {});
        });
      },

      subscribePlayerList: function(gameId, callback){
        // subscribe to topic gamerList to update gamerList everytime a new user is connected
        this.init().then(function () {
          $stomp.subscribe('/topic/game/' + gameId +'/players', callback, {});
        });
      }

    };
    return stompService;
  }]);
