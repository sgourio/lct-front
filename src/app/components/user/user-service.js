/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.userService
 * @description
 * # userService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .service('userService', [ '$log',  '$q', '$http', 'apiRoot', function ($log, $q, $http, apiRoot) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userService = {

      myAccount: function(){
        return $q(function(resolve, reject) {
          // get the list immediately
          $http.get(apiRoot + '/account/me').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/account/me' + ' respond ' + status);
              reject();
            });
        });
      },

      updateNickname: function(nickname){
        return $q(function(resolve, reject) {
          // get the list immediately
          $http.post(apiRoot + '/account/me/nickname', nickname ).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/account/me/nickname' + ' respond ' + status);
              reject();
            });
        });
      },

      myScore: function(){
        return $q(function(resolve, reject) {
          // get the list immediately
          $http.get(apiRoot + '/account/me/scores').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/account/me/scores' + ' respond ' + status);
              reject();
            });
        });
      },

      userList: function(){
        return $q(function(resolve, reject) {
          // get the list immediately
          $http.get(apiRoot + '/play/connectedUser').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/connectedUser' + ' respond ' + status);
              reject();
            });
        });
      },

      isAdmin: function(){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/auth/isAdmin').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/auth/isAdmin' +' respond ' + status);
              reject();
            });
        });
      },

      playerList: function(playGameId){
        return $q(function(resolve, reject) {
          // get the list immediately
          var url = apiRoot + '/play/game/' + playGameId + '/players';
          $http.get(url).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + url + ' respond ' + status);
              reject();
            });
        });
      },

      search: function(name){
        return $q(function(resolve, reject) {
          // get the list immediately
          var url = apiRoot + '/account/user';
          $http.post(url, name).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + url + ' respond ' + status);
              reject();
            });
        });
      },

      getFriends: function(){
        return $q(function(resolve, reject) {
          var url = apiRoot + '/account/friend';
          $http.get(url).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + url + ' respond ' + status);
              reject();
            });
        });
      },

      addFriend: function(friendId){
        return $q(function(resolve, reject) {
          var url = apiRoot + '/account/friend';
          $http.post(url, friendId).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + url + ' respond ' + status);
              reject();
            });
        });
      },

      removeFriend: function(friendId){
        return $q(function(resolve, reject) {
          // get the list immediately
          var url = apiRoot + '/account/friend/'+friendId;
          $http.delete(url).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + url + ' respond ' + status);
              reject();
            });
        });
      }
    };
    return userService;
  }]);
