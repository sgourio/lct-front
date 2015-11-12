/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';
angular.module('lct')
  .directive('contact', ['$http', 'apiRoot', '$log', function($http, apiRoot, $log) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/contact/contact.html',
      controller: function($scope){
        $scope.message = '';
        $scope.sent = false;
        $scope.send = function(){
          if( $scope.message !== '' ) {
            $http.post(apiRoot + '/account/message', $scope.message).
              success(function () {
                $scope.sent = true;
              }).
              error(function (data, status) {
                $log.error('Service ' + apiRoot + '/account/message' + ' respond ' + status);
              });
          }
        };
      }
    };
  }]);
