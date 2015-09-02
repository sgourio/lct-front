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
  .service('gameService', [ '$http', 'apiRoot', '$log', '$q', function ($http, apiRoot, $log, $q) {
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
            callbackOk(data);
          }).
          error(function (data, status) {
            $log.error('Service GET ' + apiRoot + '/game/fr/' +' respond ' + status);
          });
      },

      autoList: function(max){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/game/fr/auto?max='+max).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/game/fr/auto' +' respond ' + status);
              reject();
            });
        });
      },

      listOpenedGames: function(){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/play/games/').
            success(function (data) {
                resolve(data);
            }).
            error(function (data, status) {
                $log.error('Service GET ' + apiRoot + '/play/games/' +' respond ' + status);
                reject();
            });
        });
      },

      openGame: function(gameId, gameName, roundTime){
        return $q(function(resolve, reject) {
          $http.put(apiRoot + '/play/openGame',{
            gameId : gameId,
            gameName : gameName,
            roundTime : roundTime
          }).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service PUT ' + apiRoot + '/play/openGame' +' respond ' + status);
              reject();
            });
        });
      },

      startGame: function(gameId, startDate){
        return $q(function(resolve, reject) {
          $http.post(apiRoot + '/play/startGame',{
            playGameId : gameId,
            startDate : startDate
          }).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/play/startGame' +' respond ' + status);
              reject();
            });
        });
      },

      playGameMetaData: function(playGameId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/play/game/'+playGameId).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/game/'+ playGameId +' respond ' + status);
              reject();
            });
        });
      },

      currentRound: function(playGameId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/play/game/'+playGameId+'/round/current').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/game/'+ playGameId +'/round/current respond ' + status);
              reject();
            });
        });
      },

      getTimer: function(playGameId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/play/game/'+playGameId+'/timer').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/game/'+ playGameId +'/timer respond ' + status);
              reject();
            });
        });
      },

      joinGame: function(playGameId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/play/game/'+playGameId+'/join').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/game/'+ playGameId +'/join respond ' + status);
              reject();
            });
        });
      },

      quitGame: function(playGameId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/play/game/'+playGameId+'/quit').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/game/'+ playGameId +'/quit respond ' + status);
              reject();
            });
        });
      },

      formatDuration : function(seconds) {
        var secNum = parseInt(seconds, 10); // don't forget the second param
        var hours   = Math.floor(secNum / 3600);
        var minutes = Math.floor((secNum - (hours * 3600)) / 60);

        var time = '';
        if( hours > 0) {
          if (minutes < 10) {minutes = '0'+minutes;}
          time = hours + 'h' +minutes;
        }else{
          time = minutes + 'min';
        }
        return time;
      },

      putWord : function(playGameId, wordReference, roundNumber){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/play/game/'+playGameId+'/word?wordReference=' + encodeURIComponent(wordReference) +'&roundNumber='+roundNumber).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/game/'+playGameId+'/word?wordReference='+wordReference+'&roundNumber='+roundNumber+' respond ' + status);
              reject();
            });
        });
      }
    };
    return gameService;
  }]);
