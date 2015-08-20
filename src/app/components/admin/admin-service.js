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
      }
    };
    return adminService;
  }]);
