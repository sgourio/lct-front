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
  .service('userService', [ '$log', '$stomp', '$q', '$http', 'apiRoot', function ($log, $stomp, $q, $http, apiRoot) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userService = {
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

      subscribeUserList: function(callback){
        // subscribe to topic gamerList to update gamerList everytime a new user is connected
        $stomp.connect('/hello').then(function () {
          $stomp.subscribe('/topic/gamerList', callback, {});
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
      }
    };
    return userService;
  }]);
