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
  .service('userService', [ '$http', 'apiRoot', '$window','AccessToken', '$state', '$log', function ($http, apiRoot, $window, AccessToken, $state, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userService = {
    };
    return userService;
  }]);
