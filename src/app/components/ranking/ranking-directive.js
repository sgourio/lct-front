'use strict';
angular.module('lct')
  .directive('ranking', ['$log', '$q', '$http', 'apiRoot', 'NgTableParams', function($log, $q, $http, apiRoot, NgTableParams) {
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

        $scope.configTableParams = new NgTableParams({count: 5, 'show_filter': true },{});
        getRanking().then(function(data){
          var i;
          for( i = 0 ; i < data.monthScoreLineBeanList.length; i++){
            data.monthScoreLineBeanList[i].rank = i + 1;
          }
          $scope.configTableParams.settings({data: data.monthScoreLineBeanList});
        });
      }
    };
  }]);
