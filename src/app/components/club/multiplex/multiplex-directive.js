/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('multiplex', [ function() {
    return {
      restrict: 'E',
      scope: {
        'id' : '@'
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/multiplex.html',
      controller: function($scope) {
        if( !$scope.id ) {
          $scope.multiplex = {
            state : 'new' // opened, running, ended
          };
        }
      }
    };
  }]);
