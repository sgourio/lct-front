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
      //authenticate: function(displayName){
      //  $http.post(apiRoot + '/authenticateGplus?displayName=' + displayName).
      //    success(function () {
      //      $log.info('Authenticated');
      //      var toState = $window.sessionStorage.toState || 'home';
      //      $state.transitionTo(toState);
      //      $window.sessionStorage.toState = 'home';
      //    }).
      //    error(function (data, status) {
      //      $log.error('Service ' + apiRoot + '/authenticateGplus?displayName=' + displayName +' respond ' + status);
      //    });
      //},
      //
      //googleInfo: function(callback){
      //  $http.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + AccessToken.get().access_token).
      //    success(function (data) {
      //      $log.info(data);
      //      callback(data.displayName);
      //    }).
      //    error(function (data, status) {
      //      $log.error('error ' + status);
      //    });
      //}
    };
    return userService;
  }]);
