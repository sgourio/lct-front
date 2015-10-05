'use strict';
angular.module('lct')
  .directive('ranking', ['$log', '$q', '$http', 'apiRoot', function($log, $q, $http, apiRoot) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/ranking/ranking.html',
      controller: function($scope){
        var getRanking = function(){
          return $q(function(resolve, reject) {
            var d = new Date();
            var month = d.getMonth() + 1;
            $http.get(apiRoot + '/ranking/'+ d.getFullYear() +'/'+month).
              success(function (data) {
                resolve(data);
              }).
              error(function (data, status) {
                $log.error('Service ' + apiRoot + '/ranking/'+ d.getFullYear() +'/'+month + ' respond ' + status);
                reject();
              });
          });
        };

        getRanking().then(function(data){
          $scope.ranking = data;
        });
      }
    };
  }]);
