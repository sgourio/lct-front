'use strict';

angular.module('lct')
  .service('adminService', [ '$http', 'apiRoot', '$log', '$q', function ($http, apiRoot, $log, $q) {
    var adminService = {
      generateGame: function(){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/admin/generate').
            success(function (data) {
              $log.info('game generated');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/admin/generate' +' respond ' + status);
              reject();
            });
        });
      },

      createdClubs: function(){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/admin/club?status=created').
            success(function (data) {
              $log.info('game generated');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/admin/generate' +' respond ' + status);
              reject();
            });
        });
      },

      activateClub: function(clubId){
        return $q(function(resolve, reject) {
          $http.post(apiRoot + '/admin/club/' + clubId + '/active').
            success(function (data) {
              $log.info('game generated');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/admin/club/' + clubId + '/active respond ' + status);
              reject();
            });
        });
      }
    };
    return adminService;
  }]);
