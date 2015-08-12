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
  .service('userService', [ '$log', '$stomp', '$q', function ($log, $stomp, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userList = [];
    var userService = {
      userList: function(callback){
          $stomp.connect('/hello').then(function () {
            $stomp.subscribe('/topic/gamerList', callback, {});
        });
      }
    };
    return userService;
  }]);
