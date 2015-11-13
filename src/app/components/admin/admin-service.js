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

      getClubs: function(status){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/admin/club?status=' + status).
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
              $log.info('club activated');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/admin/club/' + clubId + '/active respond ' + status);
              reject();
            });
        });
      },

      suspendClub: function(clubId){
        return $q(function(resolve, reject) {
          $http.post(apiRoot + '/admin/club/' + clubId + '/suspend').
            success(function (data) {
              $log.info('club suspended');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/admin/club/' + clubId + '/suspend respond ' + status);
              reject();
            });
        });
      },

      deleteClub: function(clubId){
        return $q(function(resolve, reject) {
          $http.delete(apiRoot + '/admin/club/' + clubId ).
            success(function (data) {
              $log.info('club deleted');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/admin/club/' + clubId + '/suspend respond ' + status);
              reject();
            });
        });
      },

      cleanMainChat: function(){
        return $q(function(resolve, reject) {
          $http.delete(apiRoot + '/admin/chat').
            success(function (data) {
              $log.info('chat cleaned');
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/admin/chat respond ' + status);
              reject();
            });
        });
      }
    };
    return adminService;
  }]);
