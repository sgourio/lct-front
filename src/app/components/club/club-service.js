/*
 * LCT
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
  .service('clubService', [ '$http', 'apiRoot', '$log', '$q', function ($http, apiRoot, $log, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var clubService = {
      create: function(clubName){
        return $q(function(resolve, reject){
        $http.post(apiRoot + '/club', clubName).
          success(function (data) {
            $log.info('Adding club end with success, id: ' + data);
            resolve(data);
          }).
          error(function (data, status) {
            $log.error('Service ' + apiRoot + '/club' +' respond ' + status);
            reject();
          });
        });
      },

      myClubs: function(){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/club').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/club' +' respond ' + status);
              reject();
            });
        });
      },

      getClub: function(clubId){
        return $q(function(resolve, reject){
          $http.get(apiRoot + '/club/'+clubId).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/club/' + clubId +' respond ' + status);
              reject();
            });
        });
      },

      inviteUser: function(clubId, email){
        return $q(function(resolve, reject){
          $http.post(apiRoot + '/club/'+clubId+'/user', email).
            success(function (data) {
              $log.info('Adding user to club end with success, id: ' + data);
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service ' + apiRoot + '/club/user' +' respond ' + status);
              reject();
            });
        });
      }


    };
    return clubService;
  }]);
